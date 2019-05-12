var express = require('express');
var app = express();

var ObjectId =require('mongodb').ObjectId;

var MongoClient = require('mongodb').MongoClient;
var db_url = 'mongodb://localhost:27017/miniProgram';

app.use(express.static("public"));

//降序查找
app.get('/loadQuestion',function(req,res){
	MongoClient.connect(db_url,function(err,db){
		db.collection('question').find().sort({"time":-1,"views":-1}).toArray(function(err,result){
			//回馈一个json数据
			res.json(result);
		})
	})
});

//发表问题写入数据库
app.post('/publishQuestion',function(req,res){
	var getdata;
	req.on('data',data=>{
		getdata = JSON.parse(data.toString());
        MongoClient.connect(db_url,function(err,db){
			db.collection('question').insert(getdata);
            res.send('publish done');
        })
	});
});

//获取问题详情信息
app.post('/findQuestion',function(req,res){
    var questionId;
	req.on('data',data=>{
		questionId = data.toString();
		MongoClient.connect(db_url,function(err,db){
			db.collection('question').find({"_id":ObjectId(questionId)}).toArray(function(err,result){
				res.json(result)
			});
		})
	})
});

//根据id获取评论
app.post('/getComment',function(req,res){
	var questionId ;
	req.on('data',data=>{
		questionId = data.toString();
		MongoClient.connect(db_url,function(err,db){
			db.collection('comment').find({"questionId":questionId}).sort({"time":-1,"light":-1}).toArray(function(err,result){
				res.json(result)
			})
		})
	})
});

//发表评论
app.post('/publishComment',function(req,res){
	var getcomment;
	var questionId;
	req.on('data',data=>{
		getcomment = JSON.parse(data.toString());
		questionId = getcomment.questionId;
		MongoClient.connect(db_url,function(err,db){
			db.collection('comment').insert(getcomment);
			db.collection('comment').find({"questionId":questionId}).sort({"time":-1,"light":-1}).toArray(function(err,result){
				res.json(result);
			});
		})
	})
});

//浏览量加一
app.post('/addViews',function(req,res){
	req.on('data',data=>{
		var questionId = data.toString();
		var addViews;
		MongoClient.connect(db_url,function(err,db){
            db.collection('question').find({"_id":ObjectId(questionId)}).toArray(function(err,result){
                addViews = result[0].views + 1;
                db.collection('question').update({"_id":ObjectId(questionId)},{$set:{"views":(addViews)}});
                res.send('ok')
            });
        })
	})
});

//点赞
app.post('/addLight',function(req,res){
	req.on('data',data=>{
		var commentId = data.toString();
		var addLight;
		MongoClient.connect(db_url,function(err,db){
			db.collection('comment').find({"_id":ObjectId(commentId)}).toArray(function(err,result){
				addLight = result[0].light + 1;
				db.collection('comment').update({"_id":ObjectId(commentId)},{$set:{"light":(addLight)}});
				res.send('点赞成功');
			})
		})
	})
});

//添加收藏
app.post('/addMyFavour',function(req,res){
	req.on('data',data=>{
		var favour = JSON.parse(data.toString());
		MongoClient.connect(db_url,function(err,db){
			db.collection('favour').insert(favour);
			res.send('添加收藏成功');
		})
	})
});

//取消收藏
app.post('/removeFavour',function(req,res){
	req.on('data',data=>{
		var favour = JSON.parse(data.toString());
		MongoClient.connect(db_url,function(err,db){
			db.collection('favour').remove(favour);
			res.send('取消收藏成功');
		})
	})
});

//查是否收藏
app.post('/checkFavour',function(req,res){
	req.on('data',data=>{
		MongoClient.connect(db_url,function(err,db){
			db.collection('favour').find(JSON.parse(data.toString())).toArray(function(err,result){
				if(result[0]){
					res.send('ok');
				}
			})
		})
	})
});

//加载我的收藏
app.post('/loadMyFavour',function(req,res){
	req.on('data',data=>{
		var id=[];
		MongoClient.connect(db_url,function(err,db){
			db.collection('favour').find(JSON.parse(data.toString())).toArray(function(err,result){
				for(var i=0;i<result.length;i++){
					id.push(ObjectId(result[i].questionId));
				}
                db.collection('question').find({"_id":{"$in":id}}).sort({"time":-1,"views":-1}).toArray(function(err,thus){
                	res.send(thus)
                });
			});
		});
	})
});

//加载我提出的问题
app.post('/loadMyAsk',function(req,res){
	req.on('data',data=>{
		var myinfo = JSON.parse(data.toString());
		MongoClient.connect(db_url,function(err,db){
			db.collection('question').find(myinfo).sort({"time":-1,"views":-1}).toArray(function(err,result){
				res.send(result)
			})
		})
	})
});

app.listen(8090,()=>{
	console.log('listen 8090');
});
