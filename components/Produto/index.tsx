import { useState } from 'react';
import styles from './style.module.css';
import Produtos from '@/util/produtos';

type Props = {
    id: number,
    img: string,
    nome: string,
    codigo: string
}

const Produto = ({ id, img, nome, codigo }: Props) => {
    const numero = '5521969703202'; // Substitua pelo número com DDI + DDD + número
    const mensagem = `Olá, gostaria de saber sobre o produto: ${nome}, cód: ${codigo}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    return (
        <div className={styles.produtoFull}>
            <a href={`/produto/${nome}`} className={styles.produto}>
                <div className={styles.oferta}>oferta</div>
                <div className={styles.imgArea}>
                    <img src={img} alt="" className={styles.img} />
                </div>
                <div className={styles.infoArea}>
                    <div className={styles.nome}>{nome}</div>
                    <div className={styles.cod}>Código: {codigo}</div>
                </div>
                <div className={styles.space}></div>
            </a>
        </div>
    )
}

export default Produto;