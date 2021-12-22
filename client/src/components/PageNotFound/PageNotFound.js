import { Link } from "react-router-dom";

import styles from './PageNotFound.module.scss';

function PageNotFound() {
    return (
        <section className={styles.pageNotFoundComponentSection}>
            <h3>404 - Page Not Found!</h3>

            <img src="/img/404-smiley.png" alt="404 Smiley"/>

            <h4>Let's go <Link to="/"> HOME</Link> !</h4>
            
        </section>
    )
}

export default PageNotFound
