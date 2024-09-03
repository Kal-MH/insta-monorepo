import { Modal, ModalContent } from "@insta-monorepo/design-system";
import availableUsers from "@/utils/availableUsers";
import styled from "styled-components";

interface AvailableUserProps {
  isModalOpened: boolean;
  onClose: () => void;
  onClick: (username: string, password: string) => void;
}

const AvailableUser = ({
  isModalOpened,
  onClose,
  onClick,
}: AvailableUserProps) => {
  const handleClick = (username: string, password: string) => {
    onClick?.(username, password);
    onClose();
  };

  return (
    <Modal open={isModalOpened} onClose={onClose}>
      <ModalContent>
        <Container>
          <table className="rwd-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {availableUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <button
                      onClick={() => handleClick(user.username, user.password)}
                    >
                      {user.username}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClick(user.username, user.password)}
                    >
                      {user.password}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default AvailableUser;

const Container = styled.div`
  table {
    /* border: 1px #a39485 solid; */
    font-size: 0.9em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
  }

  th {
    text-align: center;
  }

  thead {
    font-weight: bold;
    color: #fff;
    background: ${(props) => props.theme.accent};
  }

  td,
  th {
    padding: 1.5em 1em;
    vertical-align: middle;

    button {
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
  }
`;
