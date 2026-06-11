const escapeHtml = (value = "") =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const createEmailHtml = (subject, text) => `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px; color: #6366f1; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">AI Growth Exa</p>
            <h1 style="margin: 0 0 16px; color: #0f172a; font-size: 24px; line-height: 1.25;">${escapeHtml(subject)}</h1>
            <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.7; white-space: pre-line;">${escapeHtml(text)}</p>
        </div>
    </div>
`;

const sendEmail = async (to, subject, text, html = createEmailHtml(subject, text)) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    const from = process.env.RESEND_FROM_EMAIL || "AI Growth Exa <onboarding@resend.dev>";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: Array.isArray(to) ? to : [to],
                subject,
                text,
                html,
            }),
            signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("Resend email sending failed:", data);
            throw new Error(data?.message || data?.error || "Email sending failed");
        }

        console.log(`Email sent to ${Array.isArray(to) ? to.join(", ") : to}`);
        return data;
    } catch (error) {
        if (error?.name === "AbortError") {
            throw new Error("Email sending timed out");
        }

        throw error;
    } finally {
        clearTimeout(timeout);
    }
};

module.exports = sendEmail;
