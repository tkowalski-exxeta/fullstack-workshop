import { Collection, Db, MongoClient } from "mongodb";

export class DataStore {
  private database?: Db;
  private mongoClient: MongoClient;

  constructor(url: string) {
    this.mongoClient = new MongoClient(url);
  }

  async connectAsync(databaseName: string): Promise<void> {
    await this.mongoClient.connect();
    this.database = this.mongoClient.db(databaseName);
  }

  async closeAsync(): Promise<void> {
    await this.mongoClient.close();
  }

  private getCollection(collectionName: string): Collection {
    if (!this.database) {
      throw new Error("Database is undefined.");
    }

    return this.database.collection(collectionName);
  }

  get forms(): Collection {
    const formsCollection = this.getCollection("forms");

    if (!formsCollection) {
      throw new Error("Form collection is undefined");
    }

    return formsCollection;
  }
}
