import { useState } from 'react';
import styles from './style.module.css';
import Produtos from '@/util/produtos';
import { useRouter } from 'next/router';

type Props = {
    img: string,
    nome: string,
    codigo: string,
    preco: number
}

const Produto = ({ img, nome, codigo, preco }: Props) => {
    const router = useRouter();
    const { produto } = router.query;
    const [copiado, setCopiado] = useState(false);

    const numero = '5521970595032';
    const mensagem = `Olá, gostaria de saber informações de preço do produto: ${nome}; código: ${codigo}`;
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
            <a
                href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(nome)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={styles.nome}>{nome}</div>
            </a>
            <div className={styles.infoArea}>

                <div className={styles.itemNome}>
                    <div
                        onClick={() => copiarTexto(codigo)}
                        style={{ color: 'blue', cursor: 'pointer', fontSize: '13px' }}
                    >
                        {codigo}
                        {copiado && <span style={{ color: 'green', marginLeft: 5 }}>✔ Copiado!</span>}
                    </div>
                </div>
                <div>
                    <a href={`${url}`} target='_blank' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: 'green', fontSize: '12px' }}>
                            Informações
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="" style={{ height: '30px', margin: '4px' }} />
                    </a>
                </div>
                {preco > 0 ?
                    <>
                        <div style={{ padding: '5px', fontSize: '13px', fontWeight: 'bold' }}>R$ {(preco * 0.9).toFixed(2)} no crédito</div>
                        <div style={{ display: 'Flex', alignItems: 'center' }}>
                            <div className={styles.price} style={{ fontSize: '16px' }}>R$ {(preco * 0.8).toFixed(2)}</div>
                            <div style={{ width: '3px' }}></div>
                            <div style={{ fontSize: '13px' }}> no dinheiro ou pix</div>
                        </div>
                    </>
                    :
                    ''
                }
            </div>
            <div className={styles.space}></div>
        </div>
    )
}

export default Produto;