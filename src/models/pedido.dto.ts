import { RefDTO } from "./red.dto";
import { pagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO {
    cliente: RefDTO;
    enderecoEntrega: RefDTO;
    pagamento: pagamentoDTO;
    itens: ItemPedidoDTO[];
}