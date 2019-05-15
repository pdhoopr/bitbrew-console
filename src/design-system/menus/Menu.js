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

export default function Menu({ children, className, heading, title }) {
  const wrapperRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuButtonIdRef = useRef(generateId(`${Menu.name}__button`));
  const menuIdRef = useRef(generateId(`${Menu.name}__items`));

  const [menuItemRefs, setMenuItemRefs] = useState([]);
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

  async function manageMenuFocus(event) {
    const isEnd = event.keyCode === 35;
    const isHome = event.keyCode === 36;
    const isUp = event.keyCode === 38;
    const isDown = event.keyCode === 40;
    if (isEnd || isHome || isUp || isDown) {
      event.preventDefault();
      const { order } = event.currentTarget.dataset;
      const firstIndex = 0;
      const lastIndex = menuItemRefs.length - 1;
      let focusIndex;
      if (isEnd) {
        focusIndex = lastIndex;
      } else if (isHome) {
        focusIndex = firstIndex;
      } else if (isUp) {
        const currentIndex = order == null ? firstIndex : Number(order);
        focusIndex = currentIndex === firstIndex ? lastIndex : currentIndex - 1;
      } else {
        const currentIndex = order == null ? lastIndex : Number(order);
        focusIndex = currentIndex === lastIndex ? firstIndex : currentIndex + 1;
      }
      if (!isOpen) {
        openMenu();
        await wait();
      }
      menuItemRefs[focusIndex].current.focus();
    }
  }

  useEffect(() => {
    setMenuItemRefs(
      React.Children.toArray(children)
        .filter(child => child.props.tabIndex !== null)
        .map(React.createRef),
    );
  }, [children]);

  let menuItemOrder = -1;
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
        onKeyDown={manageMenuFocus}
        title={title}
        id={menuButtonIdRef.current}
        aria-controls={menuIdRef.current}
        aria-expanded={isOpen}
        aria-haspopup
        aria-label={title}
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
        {React.Children.map(children, menuItem => {
          const skipFocus = menuItem.props.tabIndex === null;
          if (!skipFocus) {
            menuItemOrder += 1;
          }
          return skipFocus
            ? menuItem
            : React.cloneElement(menuItem, {
                ref: menuItemRefs[menuItemOrder],
                tabIndex: -1,
                "data-order": menuItemOrder,
                onClick() {
                  closeMenu();
                  menuButtonRef.current.focus();
                  if (menuItem.props.onClick) {
                    menuItem.props.onClick();
                  }
                },
                onKeyDown: manageMenuFocus,
                role: "menuitem",
              });
        })}
      </Items>
    </Wrapper>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Menu.defaultProps = {
  className: null,
  title: null,
};
