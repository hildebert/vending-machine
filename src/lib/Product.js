export default function Product(data) {
    const title = data.title;
    const price = data.price;
    const img = data.img;

    Object.defineProperty(this, 'title', {
        get: () => title,
        enumerable: true
    });

    Object.defineProperty(this, 'price', { get: () => price });
    Object.defineProperty(this, 'img', { get: () => img });

    this.dump = () => ({ title, price, img });
}