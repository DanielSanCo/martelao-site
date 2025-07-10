import styles from './style.module.css';

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <a href="/"><img src='/img/martelaoLogo.png' alt="" className={styles.logo} /></a>
            <input type="text" placeholder='Pesquisar produto' className={styles.produto} />
            <div>.</div>
        </div>
    )
}

export default NavBar;