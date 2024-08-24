import os
import subprocess

def initialize_git():
    # Initialize git repository
    subprocess.run(["git", "init"], check=True)
    print("Git repository initialized.")

    # Create .gitignore file
    gitignore_content = """
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
"""

    with open(".gitignore", "w") as f:
        f.write(gitignore_content.strip())
    print(".gitignore file created.")

    # Make initial commit
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Initial commit"], check=True)
    print("Initial commit made.")

# Call the function
initialize_git()