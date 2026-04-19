import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const isNetlify = !!process.env.NETLIFY || !!process.env.LAMBDA_TASK_ROOT;
  const cwd = process.cwd();
  
  const debugInfo = {
    isNetlify,
    cwd,
    nodeVersion: process.version,
    platform: process.platform,
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NETLIFY: process.env.NETLIFY,
      LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT
    },
    paths: {}
  };

  const possiblePaths = [
    path.join(cwd, 'quran.db'),
    path.join(cwd, 'frontend', 'quran.db'),
    path.join(cwd, 'public', 'quran.db'),
    path.join(cwd, '.next', 'server', 'quran.db'),
    path.join('/var/task', 'quran.db'),
    path.join('/var/task/frontend', 'quran.db'),
    path.resolve('quran.db')
  ];

  for (const p of possiblePaths) {
    debugInfo.paths[p] = {
      exists: fs.existsSync(p),
      stat: fs.existsSync(p) ? fs.statSync(p).size : null
    };
  }

  // List files in CWD
  try {
    debugInfo.cwdFiles = fs.readdirSync(cwd);
  } catch (e) {
    debugInfo.cwdFilesError = e.message;
  }

  // List files in /var/task if it exists
  if (fs.existsSync('/var/task')) {
     try {
       debugInfo.varTaskFiles = fs.readdirSync('/var/task');
     } catch (e) {
       debugInfo.varTaskFilesError = e.message;
     }
  }

  return NextResponse.json(debugInfo);
}
