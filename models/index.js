// const ChatModel = require('./Chat');
const Client = require('./Client');
const Session = require('./Session');
const Tickets = require('./Tickets');
const User = require('./User');

// Client Relationships
Client.hasMany(Tickets);

// User Relationships
User.hasMany(Session);
// User.hasMany(CustomerModel);
// User.hasMany(SettingModel);
// User.hasMany(LOAModel);
// User.hasMany(NotificationModel);
// User.hasMany(ApiKeyModel);
// User.belongsTo(PermissionGroupModel);
// User.belongsTo(TeamModel);

// PermissionNodeModel.belongsToMany(PermissionGroupModel, {
//     through: PermissionNodeGroupModel
// });

// PermissionNodeModel.belongsToMany(User, {
//     through: PermissionNodeBlacklistModel
// });

// PermissionNodeModel.belongsToMany(User, {
//     through: PermissionNodeUser
// });


// NotificationModel.belongsTo(User);

// Customer Relationships
// CustomerModel.hasMany(UserTrackerModel);
// CustomerModel.hasMany(CallRequestModel);
// CustomerModel.hasMany(LOAModel);
// CustomerModel.hasMany(SiteModel);
// CustomerModel.hasMany(NoteModel);

// CallRequest Relationships
// CallRequestModel.belongsTo(User, {
//     as: 'Requestee'
// });

// Setting Relationships
// SettingModel.belongsTo(User);

// User Tracker Relationships
// UserTrackerModel.belongsTo(User);

// TeamModel Relationships
// TeamModel.belongsTo(User, {
//     as: 'TeamLeader'
// });
// TeamModel.belongsToMany(User, {
//     through: TeamLeadersModel
// });
// TeamModel.hasMany(User)

// Session Relationship
Session.belongsTo(User);

// SiteModel.hasMany(MeterModel);

module.exports = {
    // ChatModel,
    Client,
    Session,
    Tickets,
    User
}