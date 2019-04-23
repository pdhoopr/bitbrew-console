import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { generateId, wait } from "../../utils";
import Button from "../buttons/Button";
import ExpandIcon from "../icons/ExpandIcon";

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled(ExpandIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-left: var(--size-4);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

const Items = styled.div`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-medium);
  color: var(--color-black);
  margin-top: var(--size-2);
  padding-bottom: var(--size-8);
  padding-top: var(--size-8);
  position: absolute;
  right: 0;
  z-index: 2;
`;

export default function Menu({ children, className, heading }) {
  const wrapperRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuButtonIdRef = useRef(generateId(`${Menu.name}__button`));
  const menuIdRef = useRef(generateId(`${Menu.name}__items`));
  const menuItemRefs = useRef([]);

  const [isOpen, setOpen] = useState(false);

  const closeOnEscOrTab = useCallback(event => {
    const isTab = event.keyCode === 9;
    const isEsc = event.keyCode === 27;
    if (isTab || isEsc) {
      // eslint-disable-next-line no-use-before-define
      closeMenu();
      if (isEsc) {
        menuButtonRef.current.focus();
      }
    }
  }, []);

  const closeOnOuterClick = useCallback(event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      // eslint-disable-next-line no-use-before-define
      closeMenu();
    }
  }, []);

  function openMenu() {
    document.addEventListener("click", closeOnOuterClick);
    document.addEventListener("keydown", closeOnEscOrTab);
    setOpen(true);
  }

  function closeMenu() {
    document.removeEventListener("click", closeOnOuterClick);
    document.removeEventListener("keydown", closeOnEscOrTab);
    setOpen(false);
  }

  async function focusOnSomeKeyPresses(event) {
    const isEnd = event.keyCode === 35;
    const isHome = event.keyCode === 36;
    const isUp = event.keyCode === 38;
    const isDown = event.keyCode === 40;
    if (isEnd || isHome || isUp || isDown) {
      event.preventDefault();
      const { index } = event.currentTarget.dataset;
      const firstItemIndex = 0;
      const lastItemIndex = menuItemRefs.current.length - 1;
      let itemIndexToFocus;
      if (isEnd) {
        itemIndexToFocus = lastItemIndex;
      } else if (isHome) {
        itemIndexToFocus = firstItemIndex;
      } else if (isUp) {
        const itemIndex = Number(index || firstItemIndex);
        const isFirstItem = itemIndex === firstItemIndex;
        itemIndexToFocus = isFirstItem ? lastItemIndex : itemIndex - 1;
      } else {
        const itemIndex = Number(index || lastItemIndex);
        const isLastItem = itemIndex === lastItemIndex;
        itemIndexToFocus = isLastItem ? firstItemIndex : itemIndex + 1;
      }
      if (!isOpen) {
        openMenu();
        await wait();
      }
      menuItemRefs.current[itemIndexToFocus].current.focus();
    }
  }

  useEffect(() => {
    menuItemRefs.current = React.Children.map(children, React.createRef);
  }, [children]);

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Button
        ref={menuButtonRef}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        onKeyDown={focusOnSomeKeyPresses}
        id={menuButtonIdRef.current}
        aria-controls={menuIdRef.current}
        aria-expanded={isOpen}
        aria-haspopup
      >
        {heading}
        <Icon aria-hidden />
      </Button>
      <Items
        hidden={!isOpen}
        id={menuIdRef.current}
        aria-labelledby={menuButtonIdRef.current}
        role="menu"
      >
        {React.Children.map(children, (menuItem, index) =>
          React.cloneElement(menuItem, {
            ref: menuItemRefs.current[index],
            tabIndex: -1,
            "data-index": index,
            onClick() {
              closeMenu();
              menuButtonRef.current.focus();
              menuItem.props.onClick();
            },
            onKeyDown: focusOnSomeKeyPresses,
            role: "menuitem",
          }),
        )}
      </Items>
    </Wrapper>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
};

Menu.defaultProps = {
  className: null,
};
