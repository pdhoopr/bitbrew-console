import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { generateId, wait } from "../../utils";
import { Button } from "./Buttons";

const Wrapper = styled.div`
  margin-left: var(--size-16);
  position: relative;
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

  ${/* sc-selector */ Button} {
    border-radius: 0;
    font-weight: var(--weight-regular);
    letter-spacing: normal;
    text-align: left;
    transition: background-color var(--duration-short);
    width: 100%;

    &:hover,
    &:focus {
      background-color: var(--color-light-gray);
    }

    &::before {
      content: none;
    }

    &[disabled] {
      cursor: auto;
      opacity: 0.32;

      &:hover,
      &:focus {
        background-color: transparent;
      }
    }
  }
`;

export default function Menu({ children, control }) {
  const buttonElement = useRef(null);
  const buttonId = useRef(generateId(`${Menu.name}__button`));
  const menuElement = useRef(generateId(`${Menu.name}__items`));
  const menuId = useRef(null);
  const menuItemElements = useRef([]);

  const [isOpen, setOpen] = useState(false);

  function closeOnEscOrTab(event) {
    const isTab = event.keyCode === 9;
    const isEsc = event.keyCode === 27;
    if (isTab || isEsc) {
      // eslint-disable-next-line no-use-before-define
      closeMenu();
      if (isEsc) {
        buttonElement.current.focus();
      }
    }
  }

  function closeOnOuterClick(event) {
    if (
      event.target !== menuElement.current &&
      event.target !== buttonElement.current &&
      (buttonElement.current && !buttonElement.current.contains(event.target))
    ) {
      // eslint-disable-next-line no-use-before-define
      closeMenu();
    }
  }

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
      const lastItemIndex = menuItemElements.current.length - 1;
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
      menuItemElements.current[itemIndexToFocus].current.focus();
    }
  }

  useEffect(
    () => {
      menuItemElements.current = React.Children.map(children, React.createRef);
    },
    [children],
  );

  return (
    <Wrapper>
      {React.cloneElement(control, {
        id: buttonId.current,
        onClick() {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        },
        onKeyDown: focusOnSomeKeyPresses,
        "aria-controls": menuId.current,
        "aria-expanded": isOpen,
        "aria-haspopup": true,
        ref: buttonElement,
      })}
      <Items
        id={menuId.current}
        hidden={!isOpen}
        aria-labelledby={buttonId.current}
        role="menu"
        ref={menuElement}
      >
        {React.Children.map(children, (menuItem, index) =>
          React.cloneElement(menuItem, {
            onClick() {
              buttonElement.current.focus();
              menuItem.props.onClick();
            },
            onKeyDown: focusOnSomeKeyPresses,
            "data-index": index,
            tabIndex: -1,
            role: "menuitem",
            ref: menuItemElements.current[index],
          }),
        )}
      </Items>
    </Wrapper>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  control: PropTypes.element.isRequired,
};
