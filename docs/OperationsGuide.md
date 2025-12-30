# Operations Guide (Runbook)

## 🔄 Scaling
-   **Vertical**: Increase RAM/CPU on Render/Railway if memory usage exceeds 80%.
-   **Horizontal**: Not needed for current traffic (<1000 daily users). Node.js can handle ~500 concurrent reqs.

## 💾 Backup & Restore
-   **Database**: MongoDB Atlas performs automatic daily backups.
-   **Restore**: Use Atlas UI -> "Backup" -> "Restore" to any point in time (PITR).

## 🛢️ Database Migrations
-   Application uses Mongoose (Schema-based).
-   **Adding Fields**: Edit the `models/` file. Default values ensure backward compatibility.
-   **Renaming**: Requires a manual migration script using `updateMany()`.

## 🔑 Secret Rotation
1.  Generate new keys (e.g., Razorpay Secret).
2.  Update environment variables in Render/Vercel.
3.  Restart service.
4.  **Incident**: If `JWT_SECRET` is leaked, change it immediately. All users will be logged out.

## 🚨 Incident Response
-   **Site Down**: Check Render Status page. Check Database connection in logs.
-   **Payment Failure**: Check Razorpay Dashboard for webhook failures.
