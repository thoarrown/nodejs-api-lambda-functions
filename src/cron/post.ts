import { Post, User } from "@app/entity";
import { FirebaseFireStoreService } from "@app/modules/firebase/firebase-firestore.service";
import { FirebaseService } from "@app/modules/firebase/firebase.service";
import * as firebase from 'firebase-admin';
import { Handler } from "aws-lambda";
import { Connection, createConnection, getConnectionManager, getConnectionOptions, Repository } from "typeorm";
import { LoremIpsum } from "lorem-ipsum";
import { CollectionFirestore } from "@app/modules/firebase/collection-firestore";

async function updateBlogPostTitles() {
    if (firebase.apps.length === 0) {
        new FirebaseService();
    } else {
        console.log("firebase is already initialized");
    }
    const firestore = FirebaseFireStoreService.firestore()

    const connectionManager = getConnectionManager();

    if (!connectionManager.has("default")) {
        connectionManager.create({
            name: 'default',
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            entities: [User, Post],
        })
    }

    let connection: Connection
    try {
        connection = connectionManager.get('default');
        if (!connection.isConnected)
            await connection.connect();
    } catch (error) {
        console.log(JSON.stringify(error));
    }

    const postRepo: Repository<Post> = connection.getRepository(Post)
    const allPost = await postRepo.find();

    allPost.map(async (post) => {
        const wordgen = new LoremIpsum().generateWords(1);
        post.title += " " + wordgen
        if (post.title.length > 220) return;
        await firestore.update(
            CollectionFirestore.POST,
            {
                title: post.title,
            },
            post.docId,
        );
        const updatePost = await postRepo
            .update(post.id, {
                title: post.title,
            })
        await postRepo.save(updatePost.raw)
        return updatePost;
    })
}

export const handler: Handler = async () => {
    await updateBlogPostTitles();
};
