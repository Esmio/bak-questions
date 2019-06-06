const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Errors = require('../../errors');

const TopicSchema = new Schema({
    issue_id: Schema.Types.ObjectId,
    issue: String,
    type: String,
    title: String,
    number: Number,
    required: Number,
    multi: Number,
    other_value: Number,
    follow: String,
    textarea: Number,
    answer: Number,
    multi_answer: String,
    score: Number,
    create: Date,
    status: {type: Number, default: 0},
})

const TopicModel = mongoose.model('topic', TopicSchema);

async function create(params) {
    const {
        issue,
        issue_id,
        type,
        title,
        number,
        required,
        multi,
        other_value,
        textarea,
        follow,
        answer,
        multi_answer,
        score,
    } = params;
    const create = Date.now();
    const topic = new TopicModel({
        issue,
        issue_id,
        type,
        title,
        number,
        required,
        multi,
        other_value,
        textarea,
        follow,
        answer,
        multi_answer,
        score,
        create,
    })
    let created = await topic.save()
        .catch(e => {
            console.log('create topic', e);
        })
    return created;
}

async function getListByIssueId(issue_id) {
    const flow = TopicModel.find({issue_id});
    flow.sort({'number': 1});
    return await flow
        .catch(e => {
            console.log('error getting topic by issue_id', e);
        })
}

async function deleteOneTopic(topic_id) {
    return await TopicModel.deleteOne({_id: topic_id})
        .catch(e => {
            console.log('error delete topic by topic_id', e);
        })
}

async function deleteTopicsByIssueId(id) {
    return await TopicModel.deleteMany({issue_id: id})
        .catch(e => {
            console.log('error delete topics by issue_id', e);
        })
}

module.exports = {
    model: TopicModel,
    create,
    getListByIssueId,
    deleteOneTopic,
    deleteTopicsByIssueId,
}