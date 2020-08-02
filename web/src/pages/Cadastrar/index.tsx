import React from 'react'
import api from '../../services/api'
import Card from '../../components/Card'

import { Form, Input, Button, DatePicker, message } from 'antd'

const Cadastrar = () =>{
    const dateFormat = 'DD/MM/YYYY'

    const [formPessoaCadastro] = Form.useForm()

    async function criarNovaPessoa(form: any) {
        try {
            await api.post('/pessoa', form)
            message
                .loading('Cadastrando...', 2)
                .then(() => formPessoaCadastro.resetFields(), message.success('Usuário cadastrado com sucesso!'))
        } catch (err) {
            message.error('Erro ao cadastrar essa pessoa!')
            console.error(err)
        }
    }

    return(
        <>
            <Card> 
                <h1>Cadastrar Pessoa</h1>
                <Form
                    name="form-nova-pessoa"
                    onFinish={criarNovaPessoa}
                    form={formPessoaCadastro}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: 'Digite o Nome' }]}
                    >
                        <Input
                            placeholder="Digite o nome"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        label="CPF"
                        name="cpf"
                        rules={[{ required: true, message: 'Digite o CPF' }]}
                    >
                        <Input
                            placeholder="Digite o CPF"
                            size="large" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                    >
                        <Input
                            placeholder="Digite o e-mail"
                            size="large" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="Data de Nascimento"
                        name="datanascimento"
                        rules={[{ required: true, message: 'Selecione a data de nascimento' }]}
                    >
                        <DatePicker format={dateFormat}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            size="large"
                        >
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Cadastrar

