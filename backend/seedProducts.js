require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aishopping';

const sampleProducts = [
    {
        name: "SonicPro Wireless Headphones",
        description: "High-end noise canceling wireless headphones with up to 30 hours of battery life. Perfect for focus and travel.",
        price: 299.00,
        category: "Electronics",
        rating: 4.9,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNgiTchCK8yM5d3yDUzqwCCBvC2MLeK4UZtxzqdOeLhoHGSP1cCfkQhFReyT1MJg5D1hND2QM4A-inU86JE9uf3eHUjt-FpIP7prISsRGcc1psW-QYF2OEetTSvGnMSJiEkAQO48qR-yOBsv606T6dBjC2l9GiTq05F_nDnyT64csQjyRrVa07Q5zNIeEz7waYC6CsvjiMoqQfPG_6KuHfFOgJjzki6auiv8GhluRXRNy9Ul8VEiLYPmIn2--ihdOaCkPbGp78Zq8"
    },
    {
        name: "Minimalist Quartz Watch",
        description: "Elegant silver minimalist wristwatch with a sapphire crystal face and reliable quartz movement. Dress it up or down effortlessly.",
        price: 185.00,
        category: "Fashion",
        rating: 4.7,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGZ3DBB9llXZewE7EUOb5rDAZO4ieR5jNNvzsbhH_Pp0drPpCHEv8ZT2sI2mcVaMljgaT7F3dYPOLcH9lceW8TiHM4zDv4ZA6Fa8CC46gbKT4Z5qnHgeUGndhDYeuuEoS84nK0iZ_jplAceMGn8OJHYhggtDjLHIRevpiG8x6VgOr6gd0BWaIDJi1B_7xNXnW5SJJ5JblXFchck_UHB2J7tXtvSaGEMwKDyrsLX7CsyAWfKpo7gOzAWCFVEETRUkzbNwJET4y_XRQ"
    },
    {
        name: "Instant Film Camera X2",
        description: "Retro style instant camera featuring auto-focus and a built-in flash for capturing memories the analog way.",
        price: 129.99,
        category: "Electronics",
        rating: 4.8,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaNlOSyzLHC94oxsFVvFkyQNKJAZ10_bUtGeBFwPFyuSarh7ddYGQpl1nx50075dYeJYUeBxXVbMx2uJ7SP2BYdb5Rza3r7IVVrcdbKJ4GMwENAVMVUfIWBbfD0VWWhagIBrL9ERFgO73i147s6bYo3nxnsyjUnHq8L4O3SXt7HFRD8nnvBDy4QeQ9DasfSn_02qt5b50WKvnH3RRqmUWqO_JuKlLXN5tLkZsiysIojA1aY6DpfSgGvod8wlaJ_8ocayX6MVCqz7w"
    },
    {
        name: "Zenith Smart Watch Pro",
        description: "Titanium smartwatch with a genuine leather strap, ECG monitor, fitness tracking, and a vibrant OLED display. Looks like a classic watch, performs like a mini-smartphone.",
        price: 399.00,
        category: "Electronics",
        rating: 4.6,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoB7av3_aPdsD1vNWXU_fEOeG6WLTttW1MUePTsd1jgHIs8ciMIjYUU2pZz2EZ6HeOgHL94NIJzdQ3QDt0Y3CLHkM_KVTaNVZskjkoKsv6iQBap3pbAnzpRysJXnfW_biKx1Jwhk7S-14YeTOczH-O7Y4g0pNDtwDbunKGhyWoI9tT4xOQ9fUjEUSMAB-Iuy179AiJuTD5p_Q4FqWtpxz6Jd3UPS0rhNxQvPgCVmv7BjFKpH2oZ0nY0n2tm1uY_WNvsMjchTR2qqM"
    },
    {
        name: "Artisan Mug Set",
        description: "A beautiful, minimalist ceramic coffee mug set. Handcrafted and microwave safe. Perfect addition to any modern kitchen.",
        price: 45.00,
        category: "Home & Living",
        rating: 4.7,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDQtu2hY_W8ycho6ys2XWzMqrVjhdIQwH_C8uRt-TZ2Wm3Stu-kbjVGSgvAbkh777Ls5UZpXr2dzTckMBvxrqI3EOUhHiH0p4-NxnvsFyCq-FalmItPV3-yoG1B8fD0xgjje3YNaueXh92tR5v6j57LjR6uDHw3Ststg5qwBgFs5cb_L8uIDdgMQVIoIUBI2kRaxwcdPZygXs-e7YsHs0iyVAXhc1R3kF2Y0cXZVI5SaI6YRUoZbmjszXMHiMVZkOmCF3sroGawSc"
    },
    {
        name: "ErgoFlow Wireless Mouse",
        description: "High tech wireless computer mouse with an ergonomic design meant to reduce wrist strain over long working sessions. Features 8000 DPI tracking.",
        price: 89.00,
        category: "Electronics",
        rating: 4.9,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAReWetERnZVJzLJhbD5VMdYVJHMR5mMTxXsvyVL05OQZ_48fC4IyxSu6-KbiKT08heRuB69h8SF9vSMaqhKtTDguTqNsPYcx0Pke-uBZ2e_J0q_ryOKcUZNtsBbDH7tA1qlfPA1srC8dBNfOUkcuXkn5n_rydNSAKeiCeDivFRi2wYPGr0DkA7_OILCQhSUgzuiZr9p8r6anQlX_VPSxBEiwrKehbSOiJDs3LB3_kJnMW3Hc3a5O1ZEKbVsM7TMCddSLKjmUVD0Kk"
    },
    {
        name: "Organic Cotton Tee",
        description: "A sustainable organic cotton casual t-shirt. Breathable, comfortable, and ethically made.",
        price: 32.00,
        category: "Fashion",
        rating: 4.6,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y08fV5H_N2o-_y5Hq_zT4E00o5-Jg9Qo-ZqB7Z_l3Xy3h_S5Yv9l4p_rLpG_c9kE4Z1l3Yl5Q2x0s-gqR-_QoKj_hT0r8XwV1bJ0Nq0A8H-L2E7P9D6-n8fR8K6V6L7M3fW_hV2sF4zO6J5yM_R0W0L2V5P1F8qD8N1V7R5Q4W8L2V5P1F8qD8N1V7R5Q4W8L2V5P1F8qD8N1V7R5Q4"
    },
    {
        name: "Nexus Ultra-Thin Laptop",
        description: "Sleek aluminum laptop featuring 16GB RAM and a 512GB NVMe SSD. Perfect for coding, writing, and multimedia consumption on the go.",
        price: 1099.00,
        category: "Electronics",
        rating: 4.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5n15sOpeGOz_R7I_Re8GGBllcdVNYXTVxxVan6-QvRM0ugontCZqAsfFhEPZsavUsHsTN-88LhuGo1G8N9c3nxb7uoyulvkB0NIPFdSVqn0BHW8I36qLFxGappwDrPdGjgQCGzzhOs5diwu5dlLPB39PZ2nYlIP4BNEFTkrvrfepkaMN_uIbakuWRRRY1oURVjTzyx9tj2DLtAdDZCXx88EpEvLYd1YyFrbhKDDj5C-u60qDyn8UPHCbnyHgM9BEUjopFtB2jddU"
    },
    {
        name: "Neon Mechanical Keyboard",
        description: "Customizable RGB mechanical keyboard with tactile switches. Built for gaming and fast typing.",
        price: 149.99,
        category: "Electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Ceramic Plant Pot",
        description: "Minimalist white ceramic plant pot with drainage hole and bamboo saucer. Perfect for indoor succulents.",
        price: 24.50,
        category: "Home & Living",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Vintage Leather Backpack",
        description: "Handcrafted full-grain leather backpack with multiple compartments and a padded laptop sleeve.",
        price: 215.00,
        category: "Fashion",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Smart Sleep Lamp",
        description: "Dimmable bedside lamp that simulates sunset and sunrise to help regulate your circadian rhythm.",
        price: 75.00,
        category: "Home & Living",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB. Clearing products...');
        await Product.deleteMany({});
        console.log('Inserting seed products...');
        await Product.insertMany(sampleProducts);
        console.log('Seed completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seed error:', error);
        process.exit(1);
    });
