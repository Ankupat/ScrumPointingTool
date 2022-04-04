from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/ec2-user/points.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)


class Post(db.Model):
    name = db.Column(db.String(50), primary_key=True)
    point = db.Column(db.String(3))
    absent = db.Column(db.String(3))

    def __repr__(self):
        return '<Post %s>' % self.name


class PostSchema(ma.Schema):
    class Meta:
        fields = ("name", "point", "absent")


post_schema = PostSchema()
posts_schema = PostSchema(many=True)


class PostListResource(Resource):
    def get(self):
        posts = Post.query.all()
        return posts_schema.dump(posts)

    def post(self):
        new_post = Post(
            name=request.json['name'],
            point=request.json['point'],
        absent=request.json["absent"]
        )
        db.session.add(new_post)
        db.session.commit()
        return post_schema.dump(new_post)


class PostResource(Resource):
    def get(self, post_id):
        post = Post.query.get_or_404(post_id)
        return post_schema.dump(post)

    def patch(self, post_id):
        post = Post.query.get_or_404(post_id)

        if 'name' in request.json:
            post.name = request.json['name']
        if 'point' in request.json:
            post.point = request.json['point']
        if 'absent' in request.json:
            post.absent = request.json['absent']

        db.session.commit()
        return post_schema.dump(post)

    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return '', 204


api.add_resource(PostListResource, '/posts')
api.add_resource(PostResource, '/posts/<post_id>')

@app.route("/")
def user():
    return render_template("user.html")

@app.route("/scrum/<name>")
def scrum(name):
    return render_template("scrum.html", name=name)

@app.route("/release")
def release():
    return render_template("release.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=80)