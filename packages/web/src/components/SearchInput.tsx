import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Text } from "@insta-monorepo/design-system";
import { forwardRef, useRef } from "react";

interface SearchInputProps {
  hidden: boolean;
  setHidden: (isClosed: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

const HIDDEN = "hidden";

const SearchInput = forwardRef<HTMLInputElement | null, SearchInputProps>(
  (
    { hidden, setHidden, onSubmit, placeholder, onChange, style, ...props },
    ref
  ) => {
    const targetRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(e.target as HTMLElement)
      ) {
        setHidden(true);
      }
    };
    return (
      <>
        <SearchContainer
          className={hidden ? HIDDEN : ""}
          onSubmit={onSubmit}
          onClick={(e) => e.stopPropagation()}
          style={style}
        >
          <div>
            <Text
              ref={(el) => {
                if (typeof ref === "function") {
                  ref(el);
                } else if (ref) {
                  ref.current = el;
                }

                targetRef.current = el;
              }}
              placeholder={placeholder}
              onChange={onChange}
              {...props}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
        </SearchContainer>
        <Container
          className={hidden ? HIDDEN : ""}
          ref={containerRef}
          onClick={handleOutsideClick}
        />
      </>
    );
  }
);

export default SearchInput;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.hidden {
    display: none;
  }
`;

const SearchContainer = styled.form`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;

  position: absolute;
  transform: translate(80px, 0);

  transition: transform 0.5s ease-in-out;

  &.hidden {
    transform: translate(-200%, 0);
    visibility: hidden;
  }

  div {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  input {
    margin: 0;
    height: 45px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: none;
  }
`;
