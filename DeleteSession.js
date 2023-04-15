
import Sequelize from 'sequelize';
const sequelize = new Sequelize('loanapp', 'root', '!Love2code', {
  host: 'localhost',
  dialect: 'mysql',
});



const Session = sequelize.define('Session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  data: Sequelize.TEXT,
  expires: Sequelize.DATE,
});



function deleteExpiredSessions() {
  const now = new Date();
  Session.destroy({ where: { expires: { [Sequelize.Op.lt]: now } } })
    .then(() => {
      console.log('Expired sessions deleted');
    })
    .catch((error) => {
      console.error(error);
    });
}



setInterval(deleteExpiredSessions, 60 * 1 * 1000);

export default deleteExpiredSessions