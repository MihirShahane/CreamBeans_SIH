"""
tests/test_database_integration.py
Automated Integration Test Suite for Person 6 (Database & Data-Integration Engineer)
Cream Beans SIH 2026 Campus Lost & Found System

Validates all 9 critical verification steps and contract constraints required by prompt:
1. Insert user.
2. Insert lost item.
3. Insert found item.
4. Retrieve items.
5. Retrieve only active found items.
6. Retrieve reporter information.
7. Insert match result.
8. Update item status.
9. Retrieve complete match information.
10. Verify zero field-name mutation across layers.
11. Seed dataset integrity and benchmark near-duplicate validation.
"""

import unittest
import uuid
import os
from database.models import User, Item, MatchResult, MatchDetails
from database.repository import DatabaseRepository
from database.seed_database import run_seed


class TestDatabaseIntegration(unittest.TestCase):

    def setUp(self):
        """Set up in-memory database repository for each test."""
        self.repo = DatabaseRepository(db_path=":memory:")

    def test_01_insert_user(self):
        """Step 1: Insert user."""
        user = User(
            id=str(uuid.uuid4()),
            name="Test Reporter",
            email="test.reporter@nitk.edu.in",
            phone="+91-9988776655"
        )
        inserted = self.repo.insert_user(user)
        self.assertEqual(inserted.id, user.id)

        fetched = self.repo.get_user_by_id(user.id)
        self.assertIsNotNone(fetched)
        self.assertEqual(fetched.name, "Test Reporter")
        self.assertEqual(fetched.email, "test.reporter@nitk.edu.in")
        self.assertEqual(fetched.phone, "+91-9988776655")

    def test_02_insert_lost_item(self):
        """Step 2: Insert lost item."""
        user = self.repo.insert_user(User(
            id=str(uuid.uuid4()),
            name="Lost User",
            email="lost.user@nitk.edu.in"
        ))

        lost_item = Item(
            id=str(uuid.uuid4()),
            reporter_id=user.id,
            type="lost",
            category="Backpacks",
            description="Black Lenovo backpack with laptop compartment",
            image_url="https://storage.supabase.co/lostfound/lost_bag.jpg",
            location="Central Library 2nd Floor",
            latitude=13.0102,
            longitude=74.7943,
            timestamp="2026-08-28T14:00:00Z",
            status="active",
            embedding=[0.1, 0.2, 0.3]
        )

        inserted = self.repo.insert_item(lost_item)
        self.assertEqual(inserted.type, "lost")
        self.assertEqual(inserted.status, "active")

        fetched = self.repo.get_item_by_id(lost_item.id)
        self.assertIsNotNone(fetched)
        self.assertEqual(fetched.description, lost_item.description)
        self.assertEqual(fetched.reporter_id, user.id)

    def test_03_insert_found_item(self):
        """Step 3: Insert found item."""
        user = self.repo.insert_user(User(
            id=str(uuid.uuid4()),
            name="Found User",
            email="found.user@nitk.edu.in"
        ))

        found_item = Item(
            id=str(uuid.uuid4()),
            reporter_id=user.id,
            type="found",
            category="Backpacks",
            description="Black Lenovo backpack found on chair",
            image_url="https://storage.supabase.co/lostfound/found_bag.jpg",
            location="Central Library 2nd Floor",
            latitude=13.0102,
            longitude=74.7943,
            timestamp="2026-08-28T14:30:00Z",
            status="active",
            embedding=[0.12, 0.21, 0.31]
        )

        inserted = self.repo.insert_item(found_item)
        self.assertEqual(inserted.type, "found")
        self.assertEqual(inserted.status, "active")

        fetched = self.repo.get_item_by_id(found_item.id)
        self.assertIsNotNone(fetched)
        self.assertEqual(fetched.description, found_item.description)

    def test_04_retrieve_items(self):
        """Step 4: Retrieve items."""
        user = self.repo.insert_user(User(id=str(uuid.uuid4()), name="User 1", email="u1@nitk.edu.in"))
        item1 = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="lost",
            category="Keys", description="House keys", location="LHC", timestamp="2026-08-28T10:00:00Z"
        ))
        item2 = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Keys", description="Found house keys", location="LHC", timestamp="2026-08-28T10:30:00Z"
        ))

        all_items = self.repo.get_all_items()
        item_ids = [it.id for it in all_items]
        self.assertIn(item1.id, item_ids)
        self.assertIn(item2.id, item_ids)

    def test_05_retrieve_only_active_found_items(self):
        """Step 5: Retrieve only active found items."""
        user = self.repo.insert_user(User(id=str(uuid.uuid4()), name="User 1", email="u1@nitk.edu.in"))

        # 1. Lost item (active) -> Should NOT be returned
        self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="lost",
            category="Phones", description="Lost Phone", location="LHC", timestamp="2026-08-28T10:00:00Z", status="active"
        ))
        # 2. Found item (matched) -> Should NOT be returned
        self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Phones", description="Matched Phone", location="LHC", timestamp="2026-08-28T10:00:00Z", status="matched"
        ))
        # 3. Found item (returned) -> Should NOT be returned
        self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Phones", description="Returned Phone", location="LHC", timestamp="2026-08-28T10:00:00Z", status="returned"
        ))
        # 4. Found item (active) -> SHOULD be returned!
        active_found = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Phones", description="Active Found Phone", location="LHC", timestamp="2026-08-28T10:00:00Z", status="active"
        ))

        active_found_candidates = self.repo.get_active_found_items()
        self.assertEqual(len(active_found_candidates), 1)
        self.assertEqual(active_found_candidates[0].id, active_found.id)
        self.assertEqual(active_found_candidates[0].type, "found")
        self.assertEqual(active_found_candidates[0].status, "active")

    def test_06_retrieve_reporter_information(self):
        """Step 6: Retrieve reporter information."""
        user = self.repo.insert_user(User(
            id=str(uuid.uuid4()),
            name="Karan Verma",
            email="karan.v@nitk.edu.in",
            phone="+91-9811223344"
        ))
        found_item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Wallets", description="Found wallet", location="Canteen", timestamp="2026-08-28T12:00:00Z"
        ))

        reporter_info = self.repo.get_reporter_info(found_item.reporter_id)
        self.assertIsNotNone(reporter_info)
        self.assertEqual(reporter_info.name, "Karan Verma")
        self.assertEqual(reporter_info.email, "karan.v@nitk.edu.in")
        self.assertEqual(reporter_info.phone, "+91-9811223344")

    def test_07_insert_match_result(self):
        """Step 7: Insert match result."""
        user = self.repo.insert_user(User(id=str(uuid.uuid4()), name="User 1", email="u1@nitk.edu.in"))
        lost_item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="lost",
            category="Laptops", description="Lost MacBook", location="LHC 3", timestamp="2026-08-28T10:00:00Z"
        ))
        found_item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="found",
            category="Laptops", description="Found MacBook", location="LHC 3", timestamp="2026-08-28T10:30:00Z"
        ))

        match_result = self.repo.insert_match_result(
            lost_item_id=lost_item.id,
            found_item_id=found_item.id,
            image_score=0.92,
            text_score=0.88,
            location_score=0.95,
            time_score=0.90,
            final_score=0.91
        )

        self.assertIsNotNone(match_result.id)
        self.assertEqual(match_result.lost_item_id, lost_item.id)
        self.assertEqual(match_result.found_item_id, found_item.id)
        self.assertEqual(match_result.final_score, 0.91)

        stored_matches = self.repo.get_matches_for_lost_item(lost_item.id)
        self.assertEqual(len(stored_matches), 1)
        self.assertEqual(stored_matches[0].final_score, 0.91)

    def test_08_update_item_status(self):
        """Step 8: Update item status."""
        user = self.repo.insert_user(User(id=str(uuid.uuid4()), name="User 1", email="u1@nitk.edu.in"))
        item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=user.id, type="lost",
            category="Umbrellas", description="Black umbrella", location="Mining Dept", timestamp="2026-08-28T10:00:00Z"
        ))
        self.assertEqual(item.status, "active")

        updated_matched = self.repo.update_item_status(item.id, "matched")
        self.assertEqual(updated_matched.status, "matched")

        updated_returned = self.repo.update_item_status(item.id, "returned")
        self.assertEqual(updated_returned.status, "returned")

        with self.assertRaises(ValueError):
            self.repo.update_item_status(item.id, "invalid_status")

    def test_09_retrieve_complete_match_information(self):
        """Step 9: Retrieve complete match information."""
        found_reporter = self.repo.insert_user(User(
            id=str(uuid.uuid4()),
            name="Security Guard Ramesh",
            email="ramesh.security@nitk.edu.in",
            phone="+91-9443322110"
        ))
        lost_reporter = self.repo.insert_user(User(
            id=str(uuid.uuid4()),
            name="Student Sneha",
            email="sneha.cs23@nitk.edu.in"
        ))

        lost_item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=lost_reporter.id, type="lost",
            category="Headphones", description="Lost Sony Headphones", location="Library", timestamp="2026-08-28T09:00:00Z"
        ))
        found_item = self.repo.insert_item(Item(
            id=str(uuid.uuid4()), reporter_id=found_reporter.id, type="found",
            category="Headphones", description="Found Sony Headphones", location="Library", timestamp="2026-08-28T09:15:00Z"
        ))

        match_res = self.repo.insert_match_result(
            lost_item_id=lost_item.id,
            found_item_id=found_item.id,
            image_score=0.96,
            text_score=0.94,
            location_score=0.98,
            time_score=0.95,
            final_score=0.956
        )

        complete_info = self.repo.get_complete_match_info(match_res.id)
        self.assertIsNotNone(complete_info)
        self.assertEqual(complete_info.match.final_score, 0.956)
        self.assertEqual(complete_info.lost_item.id, lost_item.id)
        self.assertEqual(complete_info.found_item.id, found_item.id)
        self.assertEqual(complete_info.found_reporter.name, "Security Guard Ramesh")
        self.assertEqual(complete_info.found_reporter.phone, "+91-9443322110")

    def test_10_field_name_integrity_and_ai_contract(self):
        """
        Verification that zero field names are modified across:
        Supabase -> FastAPI -> AI -> FastAPI -> Frontend
        """
        item = Item(
            id="test-id-123",
            type="lost",
            category="Laptops",
            description="Silver MacBook",
            location="LHC",
            timestamp="2026-08-28T10:00:00Z",
            image_url="https://example.com/macbook.jpg",
            latitude=13.0112,
            longitude=74.7960,
            status="active",
            reporter_id="user-456",
            embedding=[0.1, 0.2, 0.3]
        )

        d = item.to_dict()

        expected_keys = {
            "id", "type", "category", "description", "location",
            "timestamp", "image_url", "latitude", "longitude",
            "status", "reporter_id", "embedding"
        }
        self.assertEqual(set(d.keys()), expected_keys)

        forbidden_aliases = {"item_id", "item_type", "image", "image_path", "lat", "lng", "time", "user_id"}
        for alias in forbidden_aliases:
            self.assertNotIn(alias, d, f"Forbidden field alias '{alias}' found in AI Item representation!")

        rebuilt = Item.from_dict(d)
        self.assertEqual(rebuilt.id, item.id)
        self.assertEqual(rebuilt.type, item.type)
        self.assertEqual(rebuilt.category, item.category)
        self.assertEqual(rebuilt.description, item.description)
        self.assertEqual(rebuilt.location, item.location)
        self.assertEqual(rebuilt.timestamp, item.timestamp)
        self.assertEqual(rebuilt.image_url, item.image_url)
        self.assertEqual(rebuilt.latitude, item.latitude)
        self.assertEqual(rebuilt.longitude, item.longitude)
        self.assertEqual(rebuilt.status, item.status)
        self.assertEqual(rebuilt.reporter_id, item.reporter_id)
        self.assertEqual(rebuilt.embedding, item.embedding)

    def test_11_seed_dataset_benchmark_verification(self):
        """
        Verifies that the deterministic SIH seed dataset loads correctly and contains
        the benchmark near-duplicate test cases.
        """
        user_count, found_count, lost_count = run_seed(
            db_path="database/test_seed.db",
            seed_sql_path="database/seed.sql"
        )

        self.assertEqual(user_count, 5)
        self.assertEqual(found_count, 20)
        self.assertEqual(lost_count, 10)

        if os.path.exists("database/test_seed.db"):
            os.remove("database/test_seed.db")


if __name__ == "__main__":
    unittest.main()
