import { Model, DataTypes } from "sequelize";
import sequelize from "../configs/database.js";
import Usuario from "./Usuario.js";
import Pool from "./Pool.js";

class Chamado extends Model { }

Chamado.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('aberto', 'em andamento', 'finalizado', 'cancelado'),
        defaultValue: 'aberto',
    },
    criado_em: {
        type: DataTypes.DATE,
    },
    atualizado_em: {
        type: DataTypes.DATE,
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {model: Usuario, key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    tecnico_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {model: Usuario, key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Pool, key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    
},{
    sequelize,
    modelName:'Chamado',
    tableName: 'chamados',
    timestamps: false
});

Chamado.belongsTo(Usuario, {foreignKey: 'usuario_id', as: 'usuario'});
Chamado.belongsTo(Usuario, {foreignKey: 'tecnico_id', as: 'tecnico'});
Chamado.belongsTo(Pool, {foreignKey: 'tipo_id', as: 'pool'});

export default Chamado;

