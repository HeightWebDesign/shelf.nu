import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/shared/button";
import { ButtonGroup } from "~/components/shared/button-group";
import { useSearchParams } from "~/hooks/search-params";
import { useIsAvailabilityView } from "~/hooks/use-is-availability-view";
import { useIsUserAssetsPage } from "~/hooks/use-is-user-assets-page";
import { useViewportHeight } from "~/hooks/use-viewport-height";
import { tw } from "~/utils/tw";

export function AssetsIndexViewToggle({
  modeIsSimple = true,
}: {
  modeIsSimple?: boolean;
}) {
  const { isMd } = useViewportHeight();
  const [, setSearchParams] = useSearchParams();
  const disabledButtonStyles =
    "cursor-not-allowed pointer-events-none bg-gray-50 text-gray-800";
  const isAvailabilityView = useIsAvailabilityView();
  const isUserPage = useIsUserAssetsPage();

  const shouldShowAvailabilityView = !isUserPage && isMd && isAvailabilityView;

  return shouldShowAvailabilityView ? (
    <div className="flex items-start gap-2">
      <ButtonGroup>
        <Button
          variant="secondary"
          className={tw(
            "px-[14px]  hover:cursor-pointer",
            "font-normal text-gray-500",
            !isAvailabilityView ? disabledButtonStyles : "",
            modeIsSimple ? "py-[10px]" : ""
          )}
          disabled={!isAvailabilityView}
          type="button"
          onClick={() => {
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.delete("view");
              return newParams;
            });
          }}
          title="Switch to list view"
          tooltip="List view"
          icon="sort"
        />
        <Button
          variant="secondary"
          className={tw(
            "px-[14px] hover:cursor-pointer",
            "font-normal text-gray-500",
            isAvailabilityView ? disabledButtonStyles : "",
            modeIsSimple ? "py-[10px]" : ""
          )}
          disabled={isAvailabilityView}
          type={"button"}
          onClick={() => {
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("view", "availability");
              return newParams;
            });
          }}
          title={"Switch to availability view"}
          tooltip="Availability view"
        >
          <CalendarIcon className="size-5" />
        </Button>
      </ButtonGroup>
    </div>
  ) : null;
}
