import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => (
    <section>
        <div className={styles.wrapper}>
            <img src="/logo.png" alt="LOGO" />
            <Link to="/editor">
                <button>Try IDE</button>
            </Link>
        </div>
    </section>
);

export default Header;
