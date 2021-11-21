import styles from './Home.module.css';

const Home = () => {
    return (
        <section className={styles.homePageSection}>
            <p>Services</p>
            <form method="POST" action="">
                <input type="text" placeholder="What service?" />
                <input type="text" placeholder="Where?" />
                <input type="submit" />
            </form>
        </section>
    );
};

export default Home;
