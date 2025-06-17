exports.issueBook = (req, res) => {
    const { book1, email, issue_date, return_date, status } = req.body;
    console.log("dd", book1, email, issue_date, return_date, status);

    // Fetch user ID from email
    db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("User lookup error:", err);
            return res.status(500).send("Error fetching user");
        }
        if (results.length === 0) {
            return res.status(404).send("User not found");
        }
        const userId = results[0].id;

        // Pass correct fields to model
        mod.issueBook({ book1, userId, issue_date, return_date, status }, (err) => {
            if (err) {
                console.error("IssueBook Error:", err);
                return res.status(500).send("Error issuing book");
            }
            res.send("Book issued successfully!");
        });
    });
};