import { useState } from "react";
import { ItemBalanco } from "../../../@types/BalancoPatrimonialType";
import ButtonCadastro from "../../../components/Form/Button/buttonCadastro";
import InputCadastro from "../../../components/Form/Input/InputCadastro";
import SelectCadastro from "../../../components/Form/select/SelectCadastro";
import LayoutAdmin from "../../../layouts/admin";
import { converterFloatParaMoeda, converterMoedaParaFloat } from "../../../utils/converterMoeda";

export default function Dashboard() {
    const [partOne, setPartOne] = useState(true);
    const [partTwo, setPartTwo] = useState(false);
    const [listaBalancoPatrimonial, setListaBalancoPatrimonial] = useState<ItemBalanco[]>([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [tipo, setTipo] = useState("");
    const [negativo, setNegativo] = useState(false);
    const [ativoCirculante, setAtivoCirculante] = useState<ItemBalanco[]>([]);
    const [passivoCirculante, setPassivoCirculante] = useState<ItemBalanco[]>([]);
    const [realizavelLongoPrazo, setRealizavelLongoPrazo] = useState<ItemBalanco[]>([]);
    const [imobilizado, setImobilizado] = useState<ItemBalanco[]>([]);
    const [intangivel, setIntangivel] = useState<ItemBalanco[]>([]);
    const [investimento, setInvestimento] = useState<ItemBalanco[]>([]);
    const [totalAtivo, setTotalAtivo] = useState(0);
    const [exigivelLongoPrazo, setExigivelLongPrazo] = useState<ItemBalanco[]>([]);
    const [patrimonioLiquido, setPatrimonioLiquido] = useState<ItemBalanco[]>([]);
    const [totalPassivoPatrimonio, setTotalPassivoPatrimonio] = useState(0);

    const options = [
        {
            nome: 'Ativo Circulante',
            value: 'ativo-circulante'
        },
        {
            nome: 'Passivo Circulante',
            value: 'passivo-circulante'
        },
        {
            nome: 'Patrimônio Liquido',
            value: 'patrimonio-liquido'
        },
        {
            nome: 'Exigível a longo prazo',
            value: 'elp'
        },
        {
            nome: 'Realizavel a longo prazo',
            value: 'rlp'
        },
        {
            nome: 'Imobilizado',
            value: 'imobilizado'
        },
        {
            nome: 'Investimento',
            value: 'investimento'
        },
        {
            nome: 'Intangível',
            value: 'intangivel'
        }
    ]

    const handleAddItem = () => {
        const cloneListaBalancoPatrimonial = [...listaBalancoPatrimonial];
        const dataItem: ItemBalanco = {
            idTemp: cloneListaBalancoPatrimonial.length + 1,
            nome,
            preco: converterMoedaParaFloat(preco),
            tipo,
            negativo
        }

        cloneListaBalancoPatrimonial.push(dataItem);

        setListaBalancoPatrimonial(cloneListaBalancoPatrimonial);
        setNome("");
        setPreco("");
        setTipo("");
        setNegativo(false);
    }

    const handleRemoveItem = (idTemp: number) => {
        const cloneListaBalancoPatrimonial = [...listaBalancoPatrimonial];
        const index = cloneListaBalancoPatrimonial.findIndex(item => item.idTemp == idTemp);
        cloneListaBalancoPatrimonial.splice(index, 1);
        setListaBalancoPatrimonial(cloneListaBalancoPatrimonial);
    }

    const handleSubmit = () => {
        const cloneAtivoCirculante = [...ativoCirculante];
        const clonePassivoCirculante = [...passivoCirculante];
        const cloneRealizavelLongoPrazo = [...realizavelLongoPrazo];
        const cloneImobilizado = [...imobilizado];
        const cloneInvestimento = [...investimento];
        const cloneIntagivel = [...intangivel];
        const cloneExigivelLongoPrazo = [...exigivelLongoPrazo];
        const clonePatrimonioLiquido = [...patrimonioLiquido];
        let total = 0;

        listaBalancoPatrimonial.map((item) => {
            if (item.tipo == 'ativo-circulante') {
                cloneAtivoCirculante.push(item);
            } else if (item.tipo == 'passivo-circulante') {
                clonePassivoCirculante.push(item);
            } else if (item.tipo == 'patrimonio-liquido') {
                clonePatrimonioLiquido.push(item);
            } else if (item.tipo == 'elp') {
                cloneExigivelLongoPrazo.push(item);
            } else if (item.tipo == 'rlp') {
                cloneRealizavelLongoPrazo.push(item);
            } else if (item.tipo == 'imobilizado') {
                cloneImobilizado.push(item);
            } else if (item.tipo == 'investimento') {
                cloneInvestimento.push(item);
            } else if (item.tipo == 'intangivel') {
                cloneIntagivel.push(item);
            }
        })

        cloneAtivoCirculante.map(item => {
            if (item.negativo) {
                total = total - item.preco

            } else {
                total = total + item.preco
            }
        })
        cloneRealizavelLongoPrazo.map(item => {
            total = total + item.preco;
        })
        cloneImobilizado.map(item => {
            if (item.negativo) {
                total = total - item.preco

            } else {
                total = total + item.preco
            }
        })
        cloneIntagivel.map(item => {
            total = total + item.preco;
        })
        cloneInvestimento.map(item => {
            total = total + item.preco;
        })
        setTotalAtivo(total);

        total = 0;

        clonePassivoCirculante.map(item => {
            if (item.negativo) {
                total = total - item.preco

            } else {
                total = total + item.preco
            }
        })
        cloneExigivelLongoPrazo.map(item => {
            total = total + item.preco;
        })
        clonePatrimonioLiquido.map(item => {
            if (item.negativo) {
                total = total - item.preco

            } else {
                total = total + item.preco
            }
        })

        setTotalPassivoPatrimonio(total);
        total = 0;

        setAtivoCirculante(cloneAtivoCirculante);
        setPassivoCirculante(clonePassivoCirculante);
        setRealizavelLongoPrazo(cloneRealizavelLongoPrazo);
        setImobilizado(cloneImobilizado);
        setInvestimento(cloneInvestimento);
        setIntangivel(cloneIntagivel);
        setExigivelLongPrazo(cloneExigivelLongoPrazo);
        setPatrimonioLiquido(clonePatrimonioLiquido);
        setPartOne(false);
        setPartTwo(true);
    }

    const handleBack = () => {
        setAtivoCirculante([]);
        setPassivoCirculante([]);
        setRealizavelLongoPrazo([]);
        setImobilizado([]);
        setInvestimento([]);
        setIntangivel([]);
        setExigivelLongPrazo([]);
        setPatrimonioLiquido([]);
        setTotalAtivo(0);
        setPartOne(true);
        setPartTwo(false);
    }

    return (
        <LayoutAdmin titleHeader="Admin">
            {partOne &&
                <div className="grid grid-cols-1 gap-5 md:-mt-20 -mt-52">

                    <div className="rounded-md bg-white shadow-lg">
                        <div className="p-5 mb-5">
                            <h1 className="uppercase text-xl font-bold text-slate-800">Balanço patrimonial</h1>
                        </div>
                        <div className="bg-slate-300 p-5 grid gap-5 md:grid-cols-3 grid-cols-1 rounded-md">
                            <InputCadastro label="Nome" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                            <SelectCadastro label="Categoria" options={options} value={tipo} onChange={(e) => { setTipo(e.target.value) }} />
                            <InputCadastro label="Preço" value={preco} onChange={(e) => { setPreco(e.target.value) }} />
                            <div className="flex items-center mb-4 md:col-span-3">
                                <input id="default-checkbox" type="checkbox" onChange={(e) => { setNegativo(e.target.checked) }} checked={negativo} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Negativo</label>
                            </div>
                            <ButtonCadastro onClick={() => { handleAddItem() }}>
                                Adicionar
                            </ButtonCadastro>
                        </div>
                    </div>
                    <div className="rounded-md bg-white shadow-lg p-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Nome
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Tipo
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Preço
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaBalancoPatrimonial.map((item, index) => {
                                    const tipo = options.filter(op => op.value === item.tipo)[0].nome;
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nome}
                                            </th>
                                            <td className="py-4 px-6">
                                                {tipo}
                                            </td>
                                            <td className={`py-4 px-6 ${item.negativo ? 'text-red-600' : ''}`}>
                                                {item.negativo ? `(-) ${converterFloatParaMoeda(item.preco)}` : converterFloatParaMoeda(item.preco)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <ButtonCadastro style={{
                                                    backgroundColor: 'rgb(220 38 38)'
                                                }} onClick={() => { handleRemoveItem(item.idTemp) }}>
                                                    Excluir
                                                </ButtonCadastro>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {listaBalancoPatrimonial.length > 0 &&
                            <div className="mt-10">
                                <ButtonCadastro onClick={() => { handleSubmit() }}>
                                    Fazer balanço patrimonial
                                </ButtonCadastro>
                            </div>
                        }
                    </div>
                </div >
            }
            {partTwo &&
                <div className="md:-mt-20 -mt-52">
                    <div className="rounded-md bg-white shadow-lg p-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="text-center uppercase font-bold border p-2">
                                <h1>Ativo</h1>
                                <p>(Bens e direitos)</p>
                            </div>
                            <div className="text-center uppercase font-bold border p-2">
                                <h1>Passivo</h1>
                                <p>(Obrigações)</p>
                            </div>
                            <div className="border p-2">
                                <h1 className="uppercase font-bold text-center underline">Ativo Circulante</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {ativoCirculante.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-20 underline">Ativo Não Circulante</h1>
                                <h1 className="uppercase font-bold text-center mt-10">Realizavel a longo prazo</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {realizavelLongoPrazo.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`} >{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-10">Imobilizado</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {imobilizado.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-10">Intangível</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {intangivel.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-10">Investimento</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {investimento.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            <div className="border p-2">
                                <h1 className="uppercase font-bold text-center underline">Passivo Circulante</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {passivoCirculante.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-20 underline">Passivo não circulante</h1>
                                <h1 className="uppercase font-bold text-center mt-10">Exigivel a longo prazo</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {exigivelLongoPrazo.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                                <h1 className="uppercase font-bold text-center mt-10">Patrimonio liquido</h1>
                                <nav className="mt-10">
                                    <ul>
                                        {patrimonioLiquido.map(ativo => {
                                            return (
                                                <li className="flex justify-between p-2 border-b">
                                                    <p>{ativo.nome}</p>
                                                    <p className={`${ativo.negativo ? 'text-red-600' : ''}`}>{ativo.negativo ? `(-) ${converterFloatParaMoeda(ativo.preco)}` : converterFloatParaMoeda(ativo.preco)}</p>
                                                </li >
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            <div className="p-2 border text-center">
                                <h1 className="uppercase font-bold text-center">Total ativo</h1>
                                <p className={`${totalAtivo < 0 ? 'text-red-600' : ''} mt-5`}>
                                    {totalAtivo < 0 ? `${converterFloatParaMoeda(totalAtivo)}` : converterFloatParaMoeda(totalAtivo)}
                                </p>
                            </div>
                            <div className="p-2 border text-center">
                                <h1 className="uppercase font-bold text-center">Total passivo + patrimonio liquido</h1>
                                <p className={`${totalPassivoPatrimonio < 0 ? 'text-red-600' : ''} mt-5`}>
                                    {totalPassivoPatrimonio < 0 ? `${converterFloatParaMoeda(totalPassivoPatrimonio)}` : converterFloatParaMoeda(totalPassivoPatrimonio)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <ButtonCadastro onClick={() => { handleBack() }}>
                                Voltar
                            </ButtonCadastro>
                        </div>
                    </div>
                </div>
            }

        </LayoutAdmin >
    )
}

/**
 * [
    {
        "idTemp": 1,
        "nome": "Aplicações Financeiras",
        "preco": 3100,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 2,
        "nome": "Caixa conta movimento",
        "preco": 1200,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 3,
        "nome": "Estoque Materia Prima",
        "preco": 1243,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 4,
        "nome": "Estoque em produção AC",
        "preco": 2187,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 5,
        "nome": "Estoque em Elaboração",
        "preco": 3422,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 6,
        "nome": "Clientes",
        "preco": 6700,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 7,
        "nome": "Tributos a recolher",
        "preco": 116,
        "tipo": "ativo-circulante",
        "negativo": false
    },
    {
        "idTemp": 8,
        "nome": "PDO",
        "preco": 335,
        "tipo": "ativo-circulante",
        "negativo": true
    },
    {
        "idTemp": 9,
        "nome": "Valor a receber",
        "preco": 450,
        "tipo": "rlp",
        "negativo": false
    },
    {
        "idTemp": 10,
        "nome": "Moveis e Utensilios",
        "preco": 8342,
        "tipo": "imobilizado",
        "negativo": false
    },
    {
        "idTemp": 11,
        "nome": "Maquinas e Equipamentos",
        "preco": 10434,
        "tipo": "imobilizado",
        "negativo": false
    },
    {
        "idTemp": 12,
        "nome": "Veiculos",
        "preco": 30212,
        "tipo": "imobilizado",
        "negativo": false
    },
    {
        "idTemp": 13,
        "nome": "Imóveis",
        "preco": 99454,
        "tipo": "imobilizado",
        "negativo": false
    },
    {
        "idTemp": 14,
        "nome": "Equipamentos de Infraestrutura",
        "preco": 6753,
        "tipo": "imobilizado",
        "negativo": false
    },
    {
        "idTemp": 15,
        "nome": "Depreciação Acumulada",
        "preco": 23870,
        "tipo": "imobilizado",
        "negativo": true
    },
    {
        "idTemp": 16,
        "nome": "Particuipação de outras empresas",
        "preco": 10050,
        "tipo": "investimento",
        "negativo": false
    },
    {
        "idTemp": 17,
        "nome": "Patentes",
        "preco": 7620,
        "tipo": "intangivel",
        "negativo": false
    },
    {
        "idTemp": 18,
        "nome": "Tributos a recolher",
        "preco": 3208,
        "tipo": "passivo-circulante",
        "negativo": false
    },
    {
        "idTemp": 19,
        "nome": "Salarios a pagar",
        "preco": 5560,
        "tipo": "passivo-circulante",
        "negativo": false
    },
    {
        "idTemp": 20,
        "nome": "Previsão para devedores duvidosos",
        "preco": 927,
        "tipo": "passivo-circulante",
        "negativo": true
    },
    {
        "idTemp": 21,
        "nome": "Fornecedores",
        "preco": 5439,
        "tipo": "passivo-circulante",
        "negativo": false
    },
    {
        "idTemp": 22,
        "nome": "Emprestimo Bancario",
        "preco": 3098,
        "tipo": "passivo-circulante",
        "negativo": false
    },
    {
        "idTemp": 23,
        "nome": "Dublicatas a pagar",
        "preco": 890,
        "tipo": "passivo-circulante",
        "negativo": false
    },
    {
        "idTemp": 24,
        "nome": "Refinanciamento de Impostos",
        "preco": 2319,
        "tipo": "elp",
        "negativo": false
    },
    {
        "idTemp": 25,
        "nome": "Financiamento",
        "preco": 63643,
        "tipo": "elp",
        "negativo": false
    },
    {
        "idTemp": 26,
        "nome": "Reserva legal",
        "preco": 2300,
        "tipo": "patrimonio-liquido",
        "negativo": false
    },
    {
        "idTemp": 27,
        "nome": "Prejuizos acumulados",
        "preco": 1774,
        "tipo": "patrimonio-liquido",
        "negativo": true
    },
    {
        "idTemp": 28,
        "nome": "Reserva para investimentos",
        "preco": 12876,
        "tipo": "patrimonio-liquido",
        "negativo": false
    },
    {
        "idTemp": 29,
        "nome": "Lucros Acumulados",
        "preco": 3605,
        "tipo": "patrimonio-liquido",
        "negativo": false
    },
    {
        "idTemp": 30,
        "nome": "Capital Social",
        "preco": 64987,
        "tipo": "patrimonio-liquido",
        "negativo": false
    }
]
 */