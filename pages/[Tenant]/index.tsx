import Produto from '@/components/Produto';
import styles from './style.module.css';
import Produtos from '@/util/produtos';

const Eletrica = () => {
    return (
        <div className={styles.main}>
            {Produtos.map((item, index) => (
                <Produto
                    key={index}
                    id={index}
                    img={item.img}
                    nome={item.nome}
                    codigo={item.codigo}
                    preco={item.preco}
                />
            ))}
        </div>
    )
}

export default Eletrica;