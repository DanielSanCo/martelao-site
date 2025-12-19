import { useState } from 'react';
import styles from './style.module.css';
import Produtos from '@/util/produtos';
import { useRouter } from 'next/router';

type Props = {
    img: string,
    nome: string,
    codigo: string,
    preco: string | undefined
}

const Produto = ({ img, nome, codigo, preco }: Props) => {
    const router = useRouter();
    const { produto } = router.query;
    const [copiado, setCopiado] = useState(false);

    const numero = '5521969703202'; // Substitua pelo número com DDI + DDD + número
    const mensagem = `Olá, gostaria de saber sobre o produto: ${nome}, cód: ${codigo}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    const nomeProduto = typeof produto === 'string' ? decodeURIComponent(produto) : '';
    const prodInfo = Produtos.find(p => p.nome === nomeProduto);

    if (!prodInfo) {
        return <div>Produto inválido ou não encontrado: {nomeProduto}</div>;
    }

    const copiarTexto = async (codigo: string) => {
        try {
            await navigator.clipboard.writeText(codigo);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    return (
        <div className={styles.produto}
        >
            <a
                href={`/produto/${nome}`}
                style={{ height: '80%' }}
            >
                <div className={styles.oferta}>oferta</div>
                <div className={styles.imgArea}>
                    <img src={img} alt="" className={styles.img} />
                </div>

            </a>
                <div className={styles.nome}>{nome}</div>
            <div className={styles.infoArea}>

                <div className={styles.itemNome}>
                    <div
                        onClick={() => copiarTexto(codigo)}
                        style={{ color: 'blue', cursor: 'pointer' }}
                    >
                        {codigo}
                        {copiado && <span style={{ color: 'green', marginLeft: 5 }}>✔ Copiado!</span>}
                    </div>
                </div>

                {preco != '0' ?
                    <div className={styles.price}>R$ {preco}</div>
                    :
                    ''
                }
            </div>
            <div className={styles.space}></div>
        </div>
    )
}

export default Produto;