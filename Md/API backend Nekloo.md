# Functions.py
## CRUD
### CREATE : [Collection name, datas, document Id]
``` python
# CREATE
def create_document(collection_name, document_data, document_id=None):

    collection_ref = db.collection(collection_name)

    if document_id:
        doc_ref = collection_ref.document(document_id)
        doc_ref.set(document_data)
        return document_id

    else:
        doc_ref = collection_ref.add(document_data)
        return doc_ref[1].id
```
### UPDATE : [Collection name, datas, document Id]
``` python
# UPDATE
def update_document(collection_name, document_id, document_data):
    doc_ref = db.collection(collection_name).document(document_id)
    doc_ref.update(document_data)
    return True
```
### DELETE : [Collection name, document Id]
``` python
# DELETE
def delete_document(collection_name, document_id):
    db.collection(collection_name).document(document_id).delete()

    return True
```

### READ : [Collection name, document Id]
``` python
# READ
def read_document(collection_name, document_id):
    doc_ref = db.collection(collection_name).document(document_id)
    doc = doc_ref.get()

    if doc.exists:
        return doc.to_dict()

    else:
        return None
```

### READ ALL : [Collection name]
``` python
# READ ALL
def read_all_documents(collection_name):
    docs = db.collection(collection_name).stream()
    result = []

    for doc in docs:
        print(doc)
        doc_data = doc.to_dict()
        doc_data['id'] = doc.id
        result.append(doc_data)

    return result
```

## Authentification
### Authenticate user
``` python
# Authenticate user
def authenticate_user(email, password):
    user = users_collection.find_one({"email": email})

    if not user:
        return None

    if pbkdf2_sha256.verify(password, user['password']):
        users_collection.update_one(
            {"_id": user['_id']},
            {"$set": {"last_login": datetime.datetime.utcnow()}}
        )
        return user

    return None
```

# Main.py
