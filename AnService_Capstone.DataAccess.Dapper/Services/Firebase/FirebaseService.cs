using Firebase.Auth;
using Firebase.Storage;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services.Firebase
{
    public class FirebaseService
    {
        private static string ApiKey = "AIzaSyByEiCiKCbRZL2JAxjULH8j3KSDMFOi5ZI";
        private static string Bucket = "anservice-f4076.appspot.com";
        private static string AuthEmail = "anservice@gmail.com";
        private static string AuthPassword = "1234321aA";

        public async Task<string> Upload(Stream stream, string filePath, string fileFolder)
        {
            var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
            var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                Bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(fileFolder)
                .Child(filePath)
                .PutAsync(stream, cancellation.Token);

            try
            {
                string link = await task;
                return link;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
