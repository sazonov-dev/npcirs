const { faker } = require('@faker-js/faker');
const { User, Post } = require('./models');

function getRandomId(max = 50, min = 1) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function dbSeeders() {
  // Заполняем Users
  let userSeedCount = 0;
  let postSeedCount = 0;
  for (let i = 0; i <= 49; i++) {
    userSeedCount += 1;
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const birthdate = faker.date.birthdate();

    try {
      const user = await User.create({
        first_name: firstName, last_name: lastName, email, birthdate,
      });

      if (i === 49) {
        console.log(`Users sedeers done - count of all seeds ${userSeedCount}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  for (let i = 0; i <= 49; i++) {
    const title = faker.name.jobTitle();
    const description = faker.commerce.productDescription();
    const rating = faker.random.numeric();
    const likeCount = Math.floor(Math.random() * (999 - 1)) + 1;
    const hidden = faker.datatype.boolean();

    postSeedCount += 1;
    try {
      const posts = await Post.create({
        user_id: getRandomId(), title, description, rating, like_count: likeCount, hidden,
      });

      if (i === 49) {
        console.log(`Post sedeers done - count of all seeds ${postSeedCount}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

dbSeeders();
