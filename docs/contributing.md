# Contributing Guide

## Workflow

1. **Create feature branch** from `integration/next`
```bash
   git checkout integration/next
   git pull
   git checkout -b feature/your-feature-name
```

2. **Make changes** and commit frequently
```bash
   git add .
   git commit -m "feat: add boss phase 2 animations"
```

3. **Push and create PR**
```bash
   git push -u origin feature/your-feature-name
```
   - Create PR targeting `integration/next` (NOT main)
   - Fill out PR template
   - Tag reviewers

4. **Merge windows**: Daily at 4 PM UTC
   - All PRs reviewed and merged during this window
   - CI runs smoke tests after merge

## Commit Message Format
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting, no code change
- `refactor:` code restructuring
- `test:` adding tests
- `chore:` maintenance

## Branch Naming
- `feature/` - new features
- `fix/` - bug fixes
- `hotfix/` - urgent fixes
- `docs/` - documentation only
