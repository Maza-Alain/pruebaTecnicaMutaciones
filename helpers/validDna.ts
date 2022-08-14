// custom validator para verificar que el dna recibido cumpla el requerimiento de ser solo las letras ATCG
export const validDna = (dna: string[]) => {
    for (const base of dna) {
        for (const word of base) {
            // si la aplabra no esta en las permitidas, arroja error
            if (!['A','T','C','G'].includes(word)) throw new Error(`Invalid DNA`)
        }
    }
    return true;
}