export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    // quando adiciona o ponto de interrogação isso indica que o campo é opcional
    imageUrl?: string;
}