import styled, { keyframes } from 'styled-components';
import colors from '../../../config/colors';

import dimensions from '../../../config/dimensions';
import zIndices from '../../../config/z-indices';

const skrinkAnimation = keyframes`
  to {
    transform: scaleY(0%);
    height: 0;
    opacity: 0;
    margin-top: 0;
  }
`;

const expandAnimation = keyframes`
  from {
    transform: scaleY(0%);
  }
  to {
    transform: scaleY(100%);
    opacity: 1;
    margin-top: ${({ messages }) => (messages.length > 0 ? '1.5rem' : 0)};
  }
`;

export default styled.div`
  width: ${dimensions.chatBox.width};
  background: rgba(0, 0, 0, 0.8);
  border-radius: ${dimensions.defaults.radius};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: ${zIndices.chat_box};

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > main {
    margin-top: ${({ messages }) => (messages.length > 0 ? '1.5rem' : 0)};
    transform-origin: 50% 0;
    transition: height 500ms ease-in;

    > ul {
      list-style: none;
      margin-bottom: 1.75rem;
      max-height: ${dimensions.chatBox.messages.height};
      padding-right: 0.25rem;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: ${dimensions.scrollbar.width};
      }
      ::-webkit-scrollbar-thumb {
        background: ${colors.scrollbar.thumb.default};
        border-radius: ${dimensions.scrollbar.borderRadius};
        max-height: ${dimensions.scrollbar.maxHeight};
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${colors.scrollbar.thumb.hover};
      }

      > li {
        position: relative;

        :not(:last-child) {
          margin-bottom: 1.5rem;

          ::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.75rem;
            width: 100%;
            height: 1px;
            background: #7c7c7c;
          }
        }
      }
    }

    > form {
      display: flex;
      justify-content: space-between;

      > input {
        margin-right: 1rem;
      }
    }
  }

  &.shrinked {
    > main {
      animation: ${skrinkAnimation} 300ms forwards;
    }
  }

  &.expanded {
    > main {
      animation: ${expandAnimation} 300ms forwards;
    }
  }
`;
