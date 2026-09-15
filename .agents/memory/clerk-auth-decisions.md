---
name: Clerk authentication boundary
description: The authentication and data-isolation decision for the IE Daily Control workspace.
---

Clerk is the source of truth for account authentication and session state. The existing browser-local operational store remains a separate legacy data layer until server-backed, user-scoped persistence is implemented.

**Why:** Authentication can protect the workspace without silently changing or deleting existing local IE records. Mixing Clerk identity with the legacy demo role/session data would make account ownership ambiguous.

**How to apply:** Use Clerk session state for sign-in, sign-up, and sign-out. Treat role simulation and localStorage records as compatibility behavior until the user-scoped persistence follow-up is implemented.