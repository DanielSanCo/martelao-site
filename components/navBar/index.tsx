import { useState, ChangeEvent } from 'react';
import Produtos from '../../util/produtos';
import styles from './style.module.css';

type Produto = {
    nome: string;
    codigo: string;
    img: string;
    preco: number;
    desc: string;
    categoria: string;
};

const NavBar = () => {
    const [busca, setBusca] = useState<string>('');
    const [resultados, setResultados] = useState<Produto[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusca(valor);

        if (valor.trim() === '') {
            setResultados([]);
            return;
        }

        const filtrados = Produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(valor.toLowerCase()) ||
            produto.codigo.includes(valor)
        );
        setResultados(filtrados);
    };

    return (
        <div className={styles.navbar}>
            <a href="/">
                <img src="/img/martelaoLogo.png" alt="Logo do Martelão" className={styles.logo} />
            </a>

            {/* Container para input + resultados */}
            <div className={styles.buscaContainer}>
                <input
                    type="text"
                    placeholder="Pesquisar produto"
                    className={styles.produto}
                    value={busca}
                    onChange={handleChange}
                />

                {busca && resultados.length > 0 && (
                    <ul className={styles.resultados}>
                        {resultados.map((prod, index) => (
                            <a href={`/produto/${prod.nome}`}>
                                <li key={prod.codigo}>
                                    <img src={prod.img} alt={prod.nome} width={40} />
                                    <span>{prod.nome} - R$ {prod.preco.toFixed(2)}</span>
                                </li>
                            </a>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NavBar;
