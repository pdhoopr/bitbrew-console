import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import MenuState from '../../models/ui/MenuState';
import { createIdForA11y, wait } from '../../utils/helpers';
import { Button } from './Buttons';

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

class Menu extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  buttonId = createIdForA11y(`${Menu.name}__button`);

  buttonRef = React.createRef();

  menu = MenuState.create();

  menuId = createIdForA11y(`${Menu.name}__items`);

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
    document.addEventListener('click', this.closeOnOuterClick);
    document.addEventListener('keydown', this.closeOnEscOrTab);
  };

  closeMenu = () => {
    this.menu.close();
    document.removeEventListener('click', this.closeOnOuterClick);
    document.removeEventListener('keydown', this.closeOnEscOrTab);
  };

  focusOnSomeKeyPresses = async event => {
    const isEnd = event.keyCode === 35;
    const isHome = event.keyCode === 36;
    const isUp = event.keyCode === 38;
    const isDown = event.keyCode === 40;
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
        await wait();
      }
      this.menuItemRefs[itemIndexToFocus].current.focus();
    }
  };

  closeOnEscOrTab = event => {
    const isTab = event.keyCode === 9;
    const isEsc = event.keyCode === 27;
    if (isTab || isEsc) {
      this.closeMenu();
      if (isEsc) {
        this.buttonRef.current.focus();
      }
    }
  };

  closeOnOuterClick = event => {
    if (
      event.target !== this.menuRef.current &&
      event.target !== this.buttonRef.current &&
      (this.buttonRef.current && !this.buttonRef.current.contains(event.target))
    ) {
      this.closeMenu();
    }
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { children, control } = this.props;
    return (
      <Wrapper>
        {React.cloneElement(control, {
          id: this.buttonId,
          onClick: () => {
            if (this.menu.isOpen) {
              this.closeMenu();
            } else {
              this.openMenu();
            }
          },
          onKeyDown: this.focusOnSomeKeyPresses,
          'aria-controls': this.menuId,
          'aria-expanded': this.menu.isOpen,
          'aria-haspopup': true,
          ref: this.buttonRef,
        })}
        <Items
          id={this.menuId}
          hidden={this.menu.isClosed}
          aria-labelledby={this.buttonId}
          role="menu"
          ref={this.menuRef}
        >
          {React.Children.map(children, (menuItem, index) =>
            React.cloneElement(menuItem, {
              onClick: () => {
                this.buttonRef.current.focus();
                menuItem.props.onClick();
              },
              onKeyDown: this.focusOnSomeKeyPresses,
              'data-index': index,
              tabIndex: -1,
              role: 'menuitem',
              ref: this.menuItemRefs[index],
            }),
          )}
        </Items>
      </Wrapper>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  control: PropTypes.element.isRequired,
};

export default observer(Menu);
