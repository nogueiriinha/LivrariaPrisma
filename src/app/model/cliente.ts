export interface Cliente {
id?: number;
cpf: string;
nome: string;
sobrenome: string;
dataNascimento: string;
email: string;
senha?: string;
}
//interrogação é a não obrigação de que o campo precisa ser preenchido