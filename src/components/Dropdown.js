import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import UiStore from '../stores/UiStore';
import {
  DOWN_ARROW_KEY,
  END_KEY,
  ESC_KEY,
  HOME_KEY,
  TAB_KEY,
  UP_ARROW_KEY,
} from '../utils/keyCodes';
import { createIdForA11y, nextTick } from '../utils/tools';
import { Button } from './Buttons';
import Card from './Card';

const Wrapper = styled.div`
  margin-left: var(--size-16);
  position: relative;
`;

const Menu = styled(Card)`
  box-shadow: var(--elevation-medium);
  margin-top: var(--size-2);
  padding-bottom: var(--size-8);
  padding-top: var(--size-8);
  position: absolute;
  right: 0;
  z-index: 2;

  ${/* sc-selector */ Button} {
    border-radius: 0;
    font-weight: var(--weight-regular);
    padding-left: var(--size-16);
    padding-right: var(--size-16);
    text-align: left;
    text-transform: none;
    transition: background-color var(--duration-short);
    width: 100%;

    &:hover,
    &:focus {
      background-color: var(--color-light-gray);
    }

    &::before {
      content: none;
    }
  }
`;

class Dropdown extends React.Component {
  buttonId = createIdForA11y(`${Dropdown.name}_button`);

  buttonRef = React.createRef();

  menu = UiStore.create();

  menuId = createIdForA11y(`${Dropdown.name}__menu`);

  menuRef = React.createRef();

  menuItemRefs = React.Children.map(this.props.children, React.createRef);

  componentDidUpdate(previousProps) {
    if (this.props.children !== previousProps.children) {
      this.menuItemRefs = React.Children.map(
        this.props.children,
        React.createRef,
      );
    }
  }

  openMenu = () => {
    this.menu.open();
    window.addEventListener('click', this.closeOnOuterClick);
    window.addEventListener('keydown', this.closeOnEscOrTab);
  };

  closeMenu = () => {
    this.menu.close();
    window.removeEventListener('click', this.closeOnOuterClick);
    window.removeEventListener('keydown', this.closeOnEscOrTab);
  };

  toggleMenu = event => {
    event.stopPropagation();
    if (this.menu.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  focusOnSomeKeyPresses = async event => {
    const isEnd = event.keyCode === END_KEY;
    const isHome = event.keyCode === HOME_KEY;
    const isUp = event.keyCode === UP_ARROW_KEY;
    const isDown = event.keyCode === DOWN_ARROW_KEY;
    if (isEnd || isHome || isUp || isDown) {
      event.preventDefault();
      const { index } = event.currentTarget.dataset;
      const firstItemIndex = 0;
      const lastItemIndex = this.menuItemRefs.length - 1;
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
      if (this.menu.isClosed) {
        this.openMenu();
        await nextTick();
      }
      this.menuItemRefs[itemIndexToFocus].current.focus();
    }
  };

  focusOnMenuItemClick = onMenuItemClick => () => {
    this.buttonRef.current.focus();
    onMenuItemClick();
  };

  closeOnEscOrTab = event => {
    const isTab = event.keyCode === TAB_KEY;
    const isEsc = event.keyCode === ESC_KEY;
    if (isTab || isEsc) {
      this.closeMenu();
      if (isEsc) {
        this.buttonRef.current.focus();
      }
    }
  };

  closeOnOuterClick = event => {
    if (event.target !== this.menuRef.current) {
      this.closeMenu();
    }
  };

  render() {
    const { children, triggerButton } = this.props;
    return (
      <Wrapper>
        {React.cloneElement(triggerButton, {
          id: this.buttonId,
          onClick: this.toggleMenu,
          onKeyDown: this.focusOnSomeKeyPresses,
          'aria-controls': this.menuId,
          'aria-expanded': this.menu.isOpen,
          'aria-haspopup': true,
          innerRef: this.buttonRef,
        })}
        <Menu
          id={this.menuId}
          hidden={this.menu.isClosed}
          aria-labelledby={this.buttonId}
          role="menu"
          innerRef={this.menuRef}
        >
          {React.Children.map(children, (menuItem, index) =>
            React.cloneElement(menuItem, {
              onClick: this.focusOnMenuItemClick(menuItem.props.onClick),
              onKeyDown: this.focusOnSomeKeyPresses,
              'data-index': index,
              tabIndex: -1,
              role: 'menuitem',
              innerRef: this.menuItemRefs[index],
            }),
          )}
        </Menu>
      </Wrapper>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  triggerButton: PropTypes.element.isRequired,
};

export default observer(Dropdown);
