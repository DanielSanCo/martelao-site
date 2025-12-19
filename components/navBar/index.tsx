import { useState, ChangeEvent } from 'react';
import Produtos from '../../util/produtos';
import styles from './style.module.css';

type Produto = {
    nome: string;
    codigo: string;
    img: string;
    desc: string;
    categoria: string;
    price: number;
};

const NavBar = () => {
    const [busca, setBusca] = useState('');
    const [resultados, setResultados] = useState<Produto[]>([]);
    const [codigoCopiado, setCodigoCopiado] = useState<string | null>(null);

    const normalizarTexto = (texto: string) =>
        texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusca(valor);

        if (!valor.trim()) {
            setResultados([]);
            return;
        }

        const palavrasBusca = normalizarTexto(valor).split(' ');

        const filtrados = Produtos.filter((produto) => {
            const nomeProduto = normalizarTexto(produto.nome);
            const codigoProduto = normalizarTexto(produto.codigo);

            return palavrasBusca.every((palavra) =>
                nomeProduto
                    .split(' ')
                    .some((p) => p.includes(palavra)) ||
                codigoProduto.includes(palavra)
            );
        });

        setResultados(filtrados);
    };

    const copiarTexto = async (codigo: string) => {
        await navigator.clipboard.writeText(codigo);
        setCodigoCopiado(codigo);
        setTimeout(() => setCodigoCopiado(null), 2000);
    };

    return (
        <div className={styles.navbar}>
            <a href="/">
                <img
                    src="/img/martelaoLogo.png"
                    alt="Logo do Martelão"
                    className={styles.logo}
                />
            </a>

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
                        {resultados.map((prod) => (
                            <li key={prod.codigo} className={styles.item}>
                                <div
                                    onClick={() => copiarTexto(prod.codigo)}
                                    className={styles.codigo}
                                >
                                    {prod.codigo}
                                    {codigoCopiado === prod.codigo && (
                                        <span style={{ color: 'green', marginLeft: 5 }}>
                                            ✔ Copiado!
                                        </span>
                                    )}
                                </div>

                                <a href={`/produto/${encodeURIComponent(prod.nome)}`}>
                                    <img src={prod.img} alt={prod.nome} width={40} />
                                    <div>{prod.nome}</div>
                                    <div>- R$ {prod.price}</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NavBar;
