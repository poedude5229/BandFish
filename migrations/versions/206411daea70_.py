"""empty message

Revision ID: 206411daea70
Revises: e480781afc31
Create Date: 2024-06-13 22:48:23.783480

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '206411daea70'
down_revision = 'e480781afc31'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('wishlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['albums_podcasts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlists')
    # ### end Alembic commands ###