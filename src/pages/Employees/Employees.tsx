import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Modal } from "../../components/Modal";
import { NavigateModule } from "../../modules/NavigateModule";
import { SearchModule } from "../../modules/SearchModule";
import { SortModule, SortOption, useSorting } from "../../modules/SortModule";
import { useAppStore } from "../../store/app";
import styles from "./Employees.module.css";

export function Employees() {
  const sortBy = useAppStore((s) => s.sortBy);
  const setSortBy = useAppStore((s) => s.setSortBy);

  const [showModal, setShowModal] = useState(false);
  useSorting();

  const onSort = (v: SortOption) => {
    setSortBy(v);
    setShowModal(false);
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>Поиск</h2>

        <div className={styles.search}>
          <SearchModule />

          <Button
            className={clsx(styles.button)}
            active={sortBy !== SortOption.Default}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Icon name="list" />
          </Button>
        </div>

        <nav className={styles.nav}>
          <NavigateModule />
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <Modal
        opened={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className={styles.modal}>
          <h3 className={styles.modal__heading}>Сортировка</h3>
          <SortModule option={sortBy} onSort={onSort} />
        </div>
      </Modal>
    </>
  );
}
