import Produto from '@/components/Produto';
import styles from './style.module.css';
import Produtos from '@/util/produtos';

const Eletrica = () => {
    return (
        <div className={styles.main}>
            <div className={styles.space}></div>
            <div className={styles.produtos}>
                {Produtos.map((item, index) => (
                    <Produto
                        key={index}
                        img={item.img}
                        nome={item.nome}
                        codigo={item.codigo}
                        preco={item.price}
                    />
                ))}
            </div>
            <div className={styles.space}></div>
        </div>
    )
}

export default Eletrica;