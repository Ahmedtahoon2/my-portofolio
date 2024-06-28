"use client";

import useKnowTheme from "@/hooks/useKnowTheme";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  const theme = useKnowTheme();
  const fillColor = theme ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g id="surface1">
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: fillColor,
            fillOpacity: 1,
          }}
          d="M 11.921875 0.015625 C 10.027344 0.101562 8.363281 0.46875 6.824219 1.148438 C 5.082031 1.914062 3.566406 3.121094 2.472656 4.609375 C 1.957031 5.3125 1.460938 6.203125 1.117188 7.054688 C 0.519531 8.542969 0.210938 9.972656 0.09375 11.855469 C 0.0625 12.355469 0.0664062 13.597656 0.101562 13.996094 C 0.195312 15.082031 0.371094 15.914062 0.726562 16.949219 C 1.199219 18.335938 1.777344 19.5 2.601562 20.742188 C 3.125 21.53125 3.636719 22.15625 4.425781 22.988281 C 4.820312 23.398438 5.457031 23.988281 5.496094 23.976562 C 5.511719 23.96875 6.960938 22.257812 6.960938 22.246094 C 6.960938 22.242188 6.9375 22.222656 6.914062 22.207031 C 6.691406 22.078125 6.035156 21.464844 5.609375 20.988281 C 4.898438 20.195312 4.136719 18.9375 3.605469 17.683594 C 2.859375 15.925781 2.582031 14.535156 2.613281 12.730469 C 2.664062 10.035156 3.351562 7.761719 4.636719 6.050781 C 5.066406 5.480469 5.585938 4.957031 6.152344 4.511719 C 6.371094 4.34375 6.851562 4.023438 7.121094 3.871094 C 7.972656 3.382812 9.007812 2.996094 9.984375 2.800781 C 10.789062 2.644531 11.417969 2.582031 12.335938 2.570312 C 13.035156 2.558594 13.367188 2.574219 13.871094 2.636719 C 15.546875 2.84375 17.074219 3.507812 18.296875 4.5625 C 18.542969 4.773438 18.992188 5.230469 19.183594 5.453125 C 20.273438 6.757812 21 8.421875 21.265625 10.230469 C 21.449219 11.484375 21.433594 13.058594 21.222656 14.210938 C 20.921875 15.882812 20.195312 16.78125 18.984375 16.984375 C 18.359375 17.085938 17.804688 16.972656 17.398438 16.652344 C 17.027344 16.363281 16.75 15.820312 16.691406 15.273438 C 16.679688 15.164062 16.667969 14.433594 16.664062 13.195312 C 16.660156 12.144531 16.652344 10.625 16.648438 9.824219 C 16.644531 9.023438 16.640625 8.121094 16.640625 7.8125 L 16.640625 7.261719 L 15.523438 7.265625 L 14.410156 7.269531 L 14.273438 7.820312 C 14.199219 8.125 14.132812 8.378906 14.125 8.382812 C 14.121094 8.386719 14.089844 8.359375 14.058594 8.316406 C 13.960938 8.183594 13.679688 7.925781 13.511719 7.8125 C 13.046875 7.507812 12.492188 7.308594 11.800781 7.203125 C 11.546875 7.164062 10.832031 7.15625 10.542969 7.1875 C 9.859375 7.265625 9.203125 7.464844 8.707031 7.75 C 8.121094 8.085938 7.605469 8.585938 7.222656 9.1875 C 7.042969 9.476562 6.824219 9.921875 6.6875 10.285156 C 6.257812 11.414062 6.164062 13.097656 6.449219 14.570312 C 6.542969 15.050781 6.65625 15.449219 6.828125 15.875 C 7.308594 17.085938 8.078125 17.972656 9.0625 18.449219 C 9.335938 18.578125 9.507812 18.640625 9.792969 18.710938 C 10.144531 18.792969 10.332031 18.8125 10.800781 18.8125 C 11.449219 18.8125 11.835938 18.757812 12.476562 18.566406 C 13.371094 18.300781 13.957031 17.886719 14.109375 17.414062 L 14.132812 17.355469 L 14.382812 17.355469 L 14.441406 17.472656 C 14.609375 17.804688 14.878906 18.074219 15.363281 18.390625 C 16.101562 18.878906 17.078125 19.214844 17.933594 19.285156 C 18.167969 19.300781 18.617188 19.285156 18.929688 19.242188 C 19.917969 19.113281 20.773438 18.753906 21.550781 18.140625 C 21.753906 17.976562 22.167969 17.566406 22.34375 17.347656 C 22.5 17.152344 22.769531 16.75 22.890625 16.535156 C 23.417969 15.597656 23.753906 14.464844 23.878906 13.214844 C 24.023438 11.757812 23.890625 10.0625 23.511719 8.542969 C 22.78125 5.632812 21.199219 3.308594 18.929688 1.808594 C 17.292969 0.726562 15.597656 0.171875 13.511719 0.03125 C 13.167969 0.0078125 12.285156 0 11.921875 0.015625 Z M 11.953125 9.066406 C 12.554688 9.171875 13.105469 9.578125 13.550781 10.242188 C 14.125 11.101562 14.382812 12.378906 14.246094 13.691406 C 14.101562 15.089844 13.480469 16.203125 12.59375 16.664062 C 12.3125 16.804688 12.050781 16.871094 11.695312 16.890625 C 10.875 16.929688 10.171875 16.542969 9.644531 15.757812 C 9.292969 15.234375 9.058594 14.570312 8.949219 13.804688 C 8.910156 13.515625 8.902344 12.722656 8.9375 12.371094 C 9.007812 11.609375 9.191406 10.933594 9.453125 10.460938 C 9.902344 9.652344 10.574219 9.132812 11.296875 9.042969 C 11.453125 9.027344 11.777344 9.035156 11.953125 9.066406 Z M 11.953125 9.066406 "
        />
      </g>
    </svg>
  );
}
