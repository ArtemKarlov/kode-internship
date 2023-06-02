import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";

import { Department, getUsersList, IUser } from "../../api/users";
import { ErrorMsg } from "../../components/ErrorMsg";
import { User } from "../../components/User";
import { useUsersStore } from "../../store";
import styles from "./Employees.module.css";

export function Employees() {
  const { depId } = useParams();
  // const [employees, setEmployees] = useState<IUser[]>([]);
  const [employees, setEmployees] = useUsersStore(
    (state) => [state.users, state.setUsers],
    shallow
  );

  useEffect(() => {
    async function getEmployees() {
      const data = await getUsersList(depId as Department);
      setEmployees(data);
    }

    getEmployees();
  }, [depId, setEmployees]);

  const flag = false;

  return (
    <>
      {employees && flag ? (
        <ul className={styles.list}>
          {employees.map((user) => (
            <li key={user.id} className={styles.item}>
              <Link to={`/employee/${user.id}`}>
                <User user={user} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.error}>
          <ErrorMsg
            errorType="search"
            onAction={() => {
              console.log("handle error");
            }}
          />
        </div>
      )}
    </>
  );
}
