import styles from './style.module.css'

const navList = [
    { nome: 'Lista de produtos', link: '/lista-de-produtos' },
]

const NavBarFooter = () => {
    return (
        <div className={styles.nav}>
            {navList.map((item, index) => (
                <a href={item.link} key={index}>
                    <div key={index} className={styles.eachItem}>{item.nome}</div>
                </a>
            ))}
        </div>
    )
}

export default NavBarFooter;