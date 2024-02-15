

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/MyNewApp',);
    console.log('Connected to MongoDB');
    }