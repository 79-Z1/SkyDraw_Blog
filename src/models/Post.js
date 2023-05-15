'use strict';
const {
	Model, Sequelize
} = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User,Category }) {
			this.belongsTo(User, { foreignKey: 'user_id' });
			this.belongsToMany(Category, { through: 'PostCategory', foreignKey: 'post_id' });
		}
	}
	Post.init({
		post_id: {
			type: Sequelize.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4
		},
		title: DataTypes.STRING(500),
		content: 'NVARCHAR(max)',
		thumbnail: 'VARCHAR(500)',
		user_id: {
			type: Sequelize.UUID,
			references: {
				model: 'Users',
				key: 'user_id' // id bên user
			}
		},
		like: {
			type: 'INT',
			defaultValue: 0
		},
		unLike: {
			type: 'INT',
			defaultValue: 0
		},
		slug: 'VARCHAR(300)',
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			get: function () {
				return this.getDataValue('created_at')
					.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
			}
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			onUpdate: DataTypes.NOW,
			get: function () {
				return this.getDataValue('updated_at')
					.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
			}
		}
	}, {
		sequelize,
		modelName: 'Post',
		tableName: 'Posts',
		hooks: {
			beforeCreate: (post) => {
				post.set('slug', slugify(post.get('title')));
			},
		},
	});
	return Post;
};