export const createGenericController = (Model) => ({
    addOne: async (req, res) => {
        try {
            const responce = await Model.insertOne(req.body);
            res.status(200).json(responce);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getAll: async (req, res) => {
        try {
            const docs = await Model.find({});
            res.status(200).json(docs);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getById: async (req, res) => {
        try {
            const doc = await Model.findById(req.params._id);
            if (!doc) return res.status(404).send('No encontrado');
            res.status(200).json(doc);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateOne: async (req, res) => {
        try {
            const updated = await Model.updateOne(req.params, { $set: req.body })
            res.status(200).json(updated);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    deleteOne: async (req, res) => {
        try {
            await Model.deleteOne(req.params._id);
            res.status(200).json({ message: 'Eliminado correctamente' });
        } catch (err) {
            res.status(500).send(err);
        }
    }
});